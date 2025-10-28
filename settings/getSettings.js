const fs = require('fs');
const path = require('path');
const log = require('../setup/log.js')
const settingsPath = path.resolve(__dirname, './settings.json');
const defaultSettingsPath = path.resolve(__dirname, './defaultSettings.json');

let cachedSettings = null;
let lastLoadTime = 0;
const CACHE_DURATION = 5000;

function checkSettings(file) {
    if (!fs.existsSync(file)) {
        log.warn(`${file} does not exist — attempting to create...`);
        try {
            const defaultSettings = JSON.parse(fs.readFileSync(defaultSettingsPath, 'utf8'));

            fs.writeFileSync(file, JSON.stringify(defaultSettings, null, 2));

            if (fs.existsSync(file)) {
                log.success(`Successfully created ${file}`);
            } else {
                log.error(`Failed to create ${file}`);
            }
        } catch (err) {
            log.error(`Error creating ${file}: ${err.message}`);
        }
    }
}

function getSettings() {
    const now = Date.now();
    if (cachedSettings && now - lastLoadTime < CACHE_DURATION) {
        return cachedSettings;
    }
    try {
        const data = fs.readFileSync(settingsPath, 'utf8');
        cachedSettings = JSON.parse(data);
        lastLoadTime = now;
        return cachedSettings;
    } catch (err) {
        log.error('Failed to load Proxy Settings');
        return cachedSettings || {};
    }
}

function writeSettings(path, value) {
    try {
        const data = fs.readFileSync(settingsPath, 'utf8');
        const settings = JSON.parse(data);
        const keys = path.split('.');
        let target = settings;
        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof target[keys[i]] !== 'object' || target[keys[i]] === null) {
                target[keys[i]] = {};
            }
            target = target[keys[i]];
        }
        const finalKey = keys[keys.length - 1];
        if (value === 'toggle') {
            const current = target[finalKey];
            if (typeof current === 'boolean') {
                target[finalKey] = !current;
            } else {
                log.warn(`Cannot toggle non-boolean value at ${path}.`);
                return;
            }
        } else {
            target[finalKey] = value;
        }
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
        cachedSettings = settings;
        lastLoadTime = Date.now();
    } catch (err) {
        log.error(`Failed to update Proxy Settings - Could not write to ${path}: ${err.message}`);
    }
}

module.exports = {
    checkSettings, getSettings, writeSettings
}