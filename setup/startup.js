const chalkColours = require('./colours');

const msgs = [
    ["Thank You for downloading!", "Have fun!"],
    ["hashire hashire", "uma musume"],
    ['"vorteks #1 skid"', "rent this space for $5 a month"],
    ["ERROR CODE: C005B", "GENMEGA ATM 2ND CASSETTE MISFEED"],
    ["shut up demon", "ぞるとらく (zoltraak)"],
    ["Spread LOVE", "Not HATE"],
    ["how to make pickle pepsi at home for free", "https://www.youtube.com/watch?v=1yMozrDEqbg"],
    ["join and give suggestions pls!", "https://discord.gg/ukcfz33836"]

];

const [msg1, msg2] = msgs[Math.floor(Math.random() * msgs.length)];

const startupMessage =
    chalkColours.RED('╔═════════════════════════════╗\n') +
    chalkColours.RED('║') + chalkColours.GOLD('     HYPIXEL PROXY SERVER    ') + chalkColours.RED('║') + `     ${msg1}\n` +
    chalkColours.RED('║') + chalkColours.GOLD('  © 2025 Nikolas "kqt" Kurš  ') + chalkColours.RED('║') + `     ${msg2}\n` +
    chalkColours.RED('╚═════════════════════════════╝')

module.exports = startupMessage