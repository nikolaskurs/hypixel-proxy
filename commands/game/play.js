const { selectMode, modeGUI } = require('../../setup/modes.js')
const { getSettings } = require('../../settings/getSettings.js')
const prefix = require('../../setup/prefix.js')

// TODO ADD /PLAY DISABLING LOGIC.

module.exports = {
    name: 'play',
    execute({ client, args, target }) {
        // --- TOGGLED OFF -----------------------------------------------
        const settings = getSettings();
        if (settings.play === false) {
            const playCommand = ['/play', ...args].join(' ');
            target.write('chat', { message: playCommand });
            return;
        }
        // --- RECORD ARGS -----------------------------------------------
        if (args.length < 1) { // No arguments given
            client.write('chat', {
                message: JSON.stringify({
                    text: `\n${prefix} §7Use §6/play [mode] [submode]§7.\n  §7E.g. §6/play duels combo§7.\n`
                }),
                position: 0
            });
            return;
        };
        const arg = args[0].toLowerCase(); // mode
        const subArg = args[1]?.toLowerCase(); // submode (optional)
        const subSubArg = args[2]?.toLowerCase(); // sub-submode (optional)
        const needGUI = modeGUI(client, target, arg)
        if (needGUI) // If command opens a GUI, stop rest of logic
            return;
        const mode = selectMode(arg, subArg, subSubArg); // call switch case function
        // --- SEND COMMAND ----------------------------------------------
        if (mode) {
            target.write('chat', {
                message: `/play ${mode}`
            });
            return;
        }
        // --- SEND SUGGESTION -------------------------------------------
        function specificError(mode) {
            switch (mode) {
                case 'zombies':
                    return '/play zombiesdeadend'
                case 'hideandseek':
                    return '/play prophunt'
            }
        }
        const suggestion = specificError(arg, subArg);
        if (suggestion) {
            client.write('chat', {
                message: JSON.stringify({
                    text: `\n${prefix}§7Are you looking for §6${suggestion}§7?\n`
                }),
                position: 0
            });
            return;
        }
        // --- OPEN GUI --------------------------------------------------

        // --- INVALID ARG -----------------------------------------------
        if (!mode) {
            const unknownModes = [arg, subArg, subSubArg].filter(Boolean).join(' '); // Build all args into string
            client.write('chat', {
                message: JSON.stringify({
                    text: `\n${prefix}§7Unknown mode: §6${unknownModes}§7.\n`
                }),
                position: 0
            });
            return;
        }
    }
};