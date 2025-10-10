const mc = require('minecraft-protocol');
const { Authflow } = require('prismarine-auth');
const { formatMCChat, flattenJSON } = require('./setup/chat.js');
const log = require('./setup/log.js')
const { commands, handleCommand } = require('./commandHandler.js')

const startupMessage = require('./setup/startup.js')
console.log(startupMessage)

const tokenDir = './loginTokens'
const { createTokenDir } = require('./setup/tokens.js')
createTokenDir(tokenDir)

const port = 25565
const proxy = mc.createServer({
    'online-mode': true,
    port,
    motd: `proxy`,
    version: '1.8.9',
    maxPlayers: 1,
});

log.success(`Proxy running on localhost:${port}`);

proxy.on('login', async (client) => {
    log.info(`${client.username} connected to proxy`);

    try {
        const flow = new Authflow(client.username, tokenDir);
        const mcToken = await flow.getMinecraftJavaToken({ fetchProfile: true });

        if (!mcToken?.token) {
            log.error(`Failed to authenticate for ${client.username}`)
            client.end('§cFailed to authenticate with Microsoft.');
            return;
        }

        log.success(`Authenticated as ${mcToken.profile.name}`);

        const target = mc.createClient({
            host: 'mc.hypixel.net',
            port: 25565,
            auth: 'microsoft',
            username: mcToken.profile.name,
            uuid: mcToken.profile.id,
            accessToken: mcToken.token,
            version: `1.8.9`
        });

        target.on('packet', (data, meta) => {
            if (meta.state === 'play') {
                client.write(meta.name, data);
            }
            if (meta.name === 'chat') {
                const msg = JSON.parse(data.message)
                //console.log(formatMCChat(msg))
            }
        });

        const originalWrite = client.write.bind(client); // CHAT LOGGING

        client.write = (name, data) => {
            if (name === 'chat' && data?.message) {
                const msg = JSON.parse(data.message)
                if (msg) console.log(formatMCChat(msg))
            }

            return originalWrite(name, data);
        };

        client.on('packet', (data, meta) => {
            if (meta.state === 'play') {

                if (meta.name === 'chat') {
                    const msg = data.message;
                    if (msg.startsWith('/')) {
                        const args = msg.slice(1).trim().split(/\s+/);
                        const cmdName = args[0]?.toLowerCase();

                        const command = commands[cmdName];
                        if (command) {
                            handleCommand({ message: msg, client, target });
                            return;
                        }
                    }
                }

                target.write(meta.name, data);
            }
        });

        target.on('end', () => {
            log.info(`${client.username} disconnected from proxy`)
            client.end('§cDisconnected from Hypixel.')
        });
        target.on('error', (err) => {
            if (err.code === 'ECONNRESET' || err.code === 'ECONNABORTED') {
                log.info(`Target connection closed unexpectedly: ${err.code}`);
            } else {
                log.error(`Target connection error: ${err.message}`);
            }
            client.end('§cFailed to connect to Hypixel.');
        });
        target.on('disconnect', () => {
            log.error(`Disconnected from Hypixel`);
            client.end('§cDisconnected from Hypixel.');
        });

        client.on('end', () => target.end());
        client.on('error', () => target.end());

    } catch (err) {
        log.error(`${err.message}`);
        client.end('§cAuthentication failed.');
    }
});

process.on('SIGINT', () => {
    log.warn('Shutting down');
    process.exit(0);
});
process.on('SIGTERM', () => {
    log.warn('Shutting down');
    process.exit(0);
});