const chalkColours = require('./colours.js')

const log = {
    info: (msg) => console.log(`${chalkColours.AQUA('[i]')} ${chalkColours.AQUA(msg)}`),
    success: (msg) => console.log(`${chalkColours.LIGHT_GREEN('[+]')} ${chalkColours.LIGHT_GREEN(msg)}`),
    warn: (msg) => console.log(`${chalkColours.YELLOW('[~]')} ${chalkColours.YELLOW(msg)}`),
    error: (msg) => console.error(`${chalkColours.RED('[X]')} ${chalkColours.RED(msg)}`),
    message: (msg) => console.log(`${chalkColours.DARK_GREEN('[>]')} ${chalkColours.DARK_GREEN(msg)}`)
}

module.exports = log