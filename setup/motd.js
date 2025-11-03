const { clientVersion } = require('./version.js')
const log = require('./log.js')

let MOTD = [
    `§6v${clientVersion}`,
    `§6(c) 2025 Nikolas "kqt" Kurs`
]

function randomMOTD() {
  const randomMOTD = Math.floor(Math.random() * MOTD.length);
  const MOTDText = MOTD[randomMOTD];

  const MOTDWidth = 59;
  const centred = Math.floor((MOTDWidth - MOTDText.length - 1) / 2);

  log.invis(`MOTD: ${MOTDText}`)
  return " ".repeat(centred) + `§c[${MOTDText}§c]`
}

module.exports = {
    MOTD,
    randomMOTD
}