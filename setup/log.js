const fs = require('fs');
const path = require('path');
const chalkColours = require('./colours.js')
const { getSettings } = require('../proxy/settings/getSettings.js')

const date = new Date();
const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth()).padStart(2, '0')}-${date.getFullYear()}`
const logsDir = './local/logs'
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

let fileIndex = 1;
let logFileName = path.join(logsDir, `log_${dateStr}_${fileIndex}`)
while (fs.existsSync(logFileName)) {
    fileIndex++;
    logFileName = path.join(logsDir, `logs_${dateStr}_${fileIndex}.txt`);
}

function logToFile(sym, msg) {
    const settings = getSettings();
    if (!settings.chat.recordLogsToFile) return;

    const time = new Date().toISOString().replace('T', '').replace('Z', '')
    const logMessage = `[${time}] [${sym}] ${msg}\n`
    fs.appendFileSync(logFileName, logMessage);
}

const log = {
    info: (msg) => { console.log(`${chalkColours.AQUA('[i]')} ${chalkColours.AQUA(msg)}`), logToFile('i', msg) },
    success: (msg) => { console.log(`${chalkColours.LIGHT_GREEN('[+]')} ${chalkColours.LIGHT_GREEN(msg)}`), logToFile('+', msg) },
    warn: (msg) => { console.log(`${chalkColours.YELLOW('[!]')} ${chalkColours.YELLOW(msg)}`), logToFile('!', msg) },
    error: (msg) => { console.error(`${chalkColours.RED('[X]')} ${chalkColours.RED(msg)}`), logToFile('X', msg) },
    message: (msg) => { console.log(`${chalkColours.DARK_GREEN('[>]')} ${chalkColours.DARK_GREEN(msg)}`), logToFile('>', msg) },
    debug: (msg) => { console.log(`${chalkColours.LIGHT_PURPLE('[~]')} ${chalkColours.LIGHT_PURPLE(msg)}`), logToFile('~', msg) },
    invis: (msg) => logToFile('i', msg)
}

module.exports = log