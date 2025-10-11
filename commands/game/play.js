const { selectMode } = require('../../setup/modes.js')

module.exports = {
    name: 'play',
    execute({ client, args, target }) {
        const prefix = '§c[§6§lPROXY§r§c] » §7';

        if (args.length < 1) {
            client.write('chat', {
                message: JSON.stringify({
                    text: `\n${prefix} §7Use §6/play [mode] [submode]§7.\n  §7E.g. §6/play duels combo§7.\n`
                }),
                position: 0
            });
            return;
        };

        const arg = args[0].toLowerCase();
        const subArg = args[1]?.toLowerCase();
        const subSubArg = args[2]?.toLowerCase();
        const mode = selectMode(arg, subArg, subSubArg);


        if (mode) {
            target.write('chat', {
                message: `/play ${mode}`
            });
            return;
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

        if (!mode) {
            const unknownModes = [arg, subArg, subSubArg].filter(Boolean).join(' ');
            client.write('chat', {
                message: JSON.stringify({
                    text: `\n${prefix}Unknown mode: §6${unknownModes}§7.\n`
                }),
                position: 0
            });
            return;
        }

        function specificError(mode) {
            switch (mode) {
                case 'zombies':
                    return '/play zombiesdeadend'
                case 'hideandseek':
                    return '/play prophunt'
            }
        }
    }
};