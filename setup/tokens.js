const fs = require('fs');
const log = require('./log.js')

let firstTime = false;

function createTokenDir(dir) {
    if (!fs.existsSync(dir)) {
        log.warn('loginTokens does not exist — attempting to create...');
        firstTime = true;
        try {
            fs.mkdirSync(dir, { recursive: true });

            if (fs.existsSync(dir)) {
                log.success('Successfully created loginTokens');
            } else {
                log.error('Failed to create loginTokens');
            }
        } catch (err) {
            log.error(`Error: ${err.message}`);
        }
    }
}

function checkTokenDir(dir) {
    const files = fs.readdirSync(dir);
    if (files.length > 50) {
        log.warn(`The amount of Files in ${dir} is more than 50. Consider deleting the older ones.`)
    }
}

module.exports = { createTokenDir, checkTokenDir }