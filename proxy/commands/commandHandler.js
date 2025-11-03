const commands = {
    test: require('./admin/test.js'),
    log: require('./admin/log.js'),

    api: require('./game/api.js'),
    play: require('./game/play.js'),
    ap: require('./game/ap.js')
};

function handleCommand({ message, client, target }) {
    const args = message.slice(1).trim().split(/\s+/);
    const rawCmdName = args.shift();
    const cmdName = rawCmdName.toLowerCase();

    const command = commands[cmdName];
    if (command) {
        command.execute({
            client,
            target,
            args,
            username: target.username,
            uuid: target.uuid,
            command: rawCmdName
        });
    }
}

module.exports = { commands, handleCommand };