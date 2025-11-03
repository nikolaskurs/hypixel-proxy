const mc = require('minecraft-protocol');
const { Authflow } = require('prismarine-auth');
const { formatMCChat } = require('./setup/chat.js');
const log = require('./setup/log.js')
const { commands, handleCommand } = require('./proxy/commands/commandHandler.js')
const { alertNewVersion } = require('./setup/version.js')
const { parseLocraw } = require('./proxy/modules/location/parseLocraw.js')
const { cacheInventory } = require('./proxy/modules/gui/inventory.js')

// ─── START UP ──────────────────────────────────────────────────────────
// --- COSMETICS ---------------------------------------------------------
const startupMessage = require('./setup/startup.js')
console.log(startupMessage)
// --- CHECK AND CREATE DIRECTORIES --------------------------------------
const tokenDir = './local/loginTokens'
const logDir = './local/logs'
const { createDir, checkDir } = require('./setup/tokens.js')
createDir(tokenDir)
checkDir(tokenDir)
checkDir(logDir)
// --- CHECK AND CREATE settings.json ------------------------------------
const settings = './proxy/settings/settings.json'
const { checkSettings, getSettings } = require('./proxy/settings/getSettings.js');
checkSettings(settings)
// --- CHECK FOR OUTDATED VERSIONS ---------------------------------------
const globalVersion = '1.0.2' // change to call from api
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
                parseLocraw(data)
                //const msg = JSON.parse(data.message)
                //console.log(msg) //debugging
            }
            if (meta.name === 'window_items' && meta.state === 'play') {
                if (data.windowId === 0) { // player inventory only
                    cacheInventory(client, data.items);
                    //log.debug(`Cached ${data.items.length} inventory slots`);
                }
            }
        });
        // --- LOG CHAT --------------------------------------------------
        /** 
         * Override client.write to log client-sided messages to console.
         * If recording under target chat packets, will only record incoming chat.
        **/
        const originalWrite = client.write.bind(client);
        client.write = (name, data) => {
            if (name === 'chat' && data?.message && data.position === 0) {
                const settings = getSettings();
                if (settings.chat.recordAllMessages) {
                    const msg = JSON.parse(data.message);
                    if (msg) console.log(formatMCChat(msg));
                }
            }
            return originalWrite(name, data);
        };
        // --- RECORD CLIENT PACKETS -------------------------------------
        client.on('packet', (data, meta) => {
            if (meta.state === 'play') {
                if (meta.name === 'chat') {
                    const msg = data.message;
                    const settings = getSettings();
                    if (settings.chat.recordClientMessages) {
                        log.message(msg)
                    } // Client Message Logs - add toggle
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