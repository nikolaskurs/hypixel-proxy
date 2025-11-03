const log = require('../../../setup/log.js');

const location = { // see ../commands/admin/test.js for example use.
    server: null,
    gametype: null,
    mode: null,
    map: null,
    lobbyname: null
};

function parseLocraw(data) {
    if (!data?.message) return;
    try {
        const msg = JSON.parse(data.message);
        const plainText = msg.text;
        if (!plainText || plainText[0] !== '{' || !plainText.includes('"server":')) return;

        const locraw = JSON.parse(plainText);

        if (locraw.server && locraw.server !== location.server) {
            location.server = locraw.server;
            location.gametype = locraw.gametype || null;
            location.mode = locraw.mode || null;
            location.map = locraw.map || null;
            location.lobbyname = locraw.lobbyname || null;
        }

    } catch (err) {
        if (!String(err).includes('Unexpected token')) {
            log.error(`Error fetching Location Data: ${err}`);
        }
    }
}

module.exports = { parseLocraw, location };