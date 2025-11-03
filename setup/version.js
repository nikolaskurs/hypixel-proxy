const log = require('./log.js')
const clientVersion = "1.0.2" // Manually Set the Client Version here

function alertNewVersion(globalVersion) {
    if (clientVersion !== globalVersion)
        log.warn(`Your client version (${clientVersion}) is out of date. Please update to ${globalVersion} by downloading the latest release.`)
}

module.exports = {
    alertNewVersion
}