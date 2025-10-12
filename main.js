const mc = require('minecraft-protocol');
const { Authflow } = require('prismarine-auth');
const { formatMCChat } = require('./setup/chat.js');
const log = require('./setup/log.js')
const { commands, handleCommand } = require('./commandHandler.js')
const { alertNewVersion } = require('./setup/version.js')

// ─── START UP ──────────────────────────────────────────────────────────
// --- COSMETICS ---------------------------------------------------------
const startupMessage = require('./setup/startup.js')
console.log(startupMessage)
// --- CHECK AND CREATE loginTokens DIR ----------------------------------
const tokenDir = './loginTokens'
const { createTokenDir } = require('./setup/tokens.js')
createTokenDir(tokenDir)
// --- CHECK FOR OUTDATED VERSIONS ---------------------------------------
const globalVersion = '1.0.0' // change to call from api
alertNewVersion(globalVersion)
// ─── CREATE LOCAL SERVER ───────────────────────────────────────────────
const port = 25565
const proxy = mc.createServer({
    'online-mode': true,
    port,
    motd: `proxy`,
    version: '1.8.9',
    maxPlayers: 1,
});
log.success(`Proxy running on localhost:${port}`);
// ─── CONNECT TO LOCAL SERVER ───────────────────────────────────────────
proxy.on('login', async (client) => {
    log.info(`${client.username} connected to proxy`);
    try {
        // --- AUTHENTICATE ACCOUNT --------------------------------------
        const flow = new Authflow(client.username, tokenDir);
        const mcToken = await flow.getMinecraftJavaToken({ fetchProfile: true });
        if (!mcToken?.token) {
            log.error(`Failed to authenticate for ${client.username}`)
            client.end('§cFailed to authenticate with Microsoft.');
            return;
        }
        log.success(`Authenticated as ${mcToken.profile.name}`);
        // --- CREATE CLIENT ---------------------------------------------
        const target = mc.createClient({
            host: 'mc.hypixel.net',
            port: 25565,
            auth: 'microsoft',
            username: mcToken.profile.name,
            uuid: mcToken.profile.id,
            accessToken: mcToken.token,
            version: `1.8.9`
        });
        // ─── RELAY PACKETS ─────────────────────────────────────────────
        // Relay all target packets to client and vice versa.
        // --- RECORD TARGET PACKETS -------------------------------------
        target.on('packet', (data, meta) => {
            if (meta.state === 'play') {
                client.write(meta.name, data);
            }
            if (meta.name === 'chat') {
                //const msg = JSON.parse(data.message)
                //console.log(msg) //debugging
            }
        });
        // --- LOG CHAT --------------------------------------------------
        /** 
         * Override client.write to log client-sided messages to console.
         * If recording under target chat packets, will only record incoming chat.
        **/
        const originalWrite = client.write.bind(client);
        client.write = (name, data) => {
            if (name === 'chat' && data?.message) {
                const msg = JSON.parse(data.message)
                //console.log(msg) //debugging
                if (msg) console.log(formatMCChat(msg))
            }
            return originalWrite(name, data);
        };
        // --- RECORD CLIENT PACKETS -------------------------------------
        client.on('packet', (data, meta) => {
            if (meta.state === 'play') {
                if (meta.name === 'chat') {
                    const msg = data.message;
                    log.message(msg) // Client Message Logs - add toggle
                    // --- HANDLE COMMANDS --------------------------------
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
        // ─── DISCONNECT HANDLERS ───────────────────────────────────────
        target.on('end', () => { // Client ends successfully
            log.info(`${client.username} disconnected from proxy`)
            client.end('§cDisconnected from Hypixel.')
        });
        target.on('error', (err) => { // Client ends due to error
            log.error(`Target connection error: ${err.code || err.message}`);
            client.end('§cFailed to connect to Hypixel.');
        });
        target.on('disconnect', () => { // Client ends due to disconnect (potential hypixel ban)
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
// ─── GRACEFUL SHUTDOWN ─────────────────────────────────────────────────
process.on('SIGINT', () => {
    log.warn('Shutting down');
    process.exit(0);
});
process.on('SIGTERM', () => {
    log.warn('Shutting down');
    process.exit(0);
});