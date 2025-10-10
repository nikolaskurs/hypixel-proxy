const fs = require('fs');
const log = require('./log.js')

function createTokenDir(dir) {
    if (!fs.existsSync(dir)) {
        log.warn('loginTokens does not exist — attempting to create...');
        try {
            fs.mkdirSync(dir, { recursive: true });

            if (fs.existsSync(dir)) {
                log.success('Success');
            } else {
                log.error('Fail');
            }
        } catch (err) {
            log.error(`Error: ${err.message}`);
        }
    }
}

module.exports = { createTokenDir }