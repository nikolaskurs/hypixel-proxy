const fs = require('fs');
const log = require('./log.js')

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        log.warn(`${dir} does not exist — attempting to create...`);
        try {
            fs.mkdirSync(dir, { recursive: true });

            if (fs.existsSync(dir)) {
                log.success(`Successfully created ${dir}`);
            } else {
                log.error(`Failed to create ${dir}`);
            }
        } catch (err) {
            log.error(`Error: ${err.message}`);
        }
    }
}

function checkDir(dir) {
    const files = fs.readdirSync(dir);
    if (files.length > 50) {
        log.warn(`The amount of Files in ${dir} is more than 50. Consider deleting the older ones.`)
    }
}

module.exports = { createDir, checkDir }