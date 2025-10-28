const chalk = require('chalk');

const chalkColours = {

    RED: chalk.hex('#FF5555'),
    DARK_RED: chalk.hex('#AA0000'),
    GOLD: chalk.hex('#FFAA00'),
    YELLOW: chalk.hex('#FFFF55'),
    LIGHT_GREEN: chalk.hex('#55FF55'),
    DARK_GREEN: chalk.hex('#00AA00'),
    AQUA: chalk.hex('#55FFFF'),
    CYAN: chalk.hex('#00AAAA'),
    BLUE: chalk.hex('#5555FF'),
    DARK_BLUE: chalk.hex('#0000AA'),
    LIGHT_PURPLE: chalk.hex('#FF55FF'),
    PURPLE: chalk.hex('#AA00AA'),
    WHITE: chalk.hex('#FFFFFF'),
    GRAY: chalk.hex('#AAAAAA'),
    DARK_GRAY: chalk.hex('#555555'),
    BLACK: chalk.hex('#000000'),

    '0': chalk.hex('#000000'),
    '1': chalk.hex('#0000AA'),
    '2': chalk.hex('#00AA00'),
    '3': chalk.hex('#00AAAA'),
    '4': chalk.hex('#AA0000'),
    '5': chalk.hex('#AA00AA'),
    '6': chalk.hex('#FFAA00'),
    '7': chalk.hex('#AAAAAA'),
    '8': chalk.hex('#555555'),
    '9': chalk.hex('#5555FF'),
    'a': chalk.hex('#55FF55'),
    'b': chalk.hex('#55FFFF'),
    'c': chalk.hex('#FF5555'),
    'd': chalk.hex('#FF55FF'),
    'e': chalk.hex('#FFFF55'),
    'f': chalk.hex('#FFFFFF'),
    /*'l': chalk.bold, 
    'o': chalk.italic,      for newer terminals - doesnt work on mine so removed :D
    'n': chalk.underline,
    'm': chalk.strikethrough,*/
    'r': chalk.reset
}

module.exports = chalkColours;
