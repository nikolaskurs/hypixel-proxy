const chalkColours = require('./colours.js')

const log = {
    info: (msg) => console.log(`${chalkColours.CYAN('[i]')} ${chalkColours.CYAN(msg)}`),
    success: (msg) => console.log(`${chalkColours.LIGHT_GREEN('[+]')} ${chalkColours.LIGHT_GREEN(msg)}`),
    warn: (msg) => console.log(`${chalkColours.GOLD('[~]')} ${chalkColours.GOLD(msg)}`),
    error: (msg) => console.error(`${chalkColours.RED('[X]')} ${chalkColours.RED(msg)}`),
}

module.exports = log