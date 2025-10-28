const { closeGUI, createGUI } = require('./setup.js');

function playItem(blockId, itemCount, itemDamage, name, command, usage) {
    return {
        item: {
            blockId,
            itemCount,
            itemDamage,
            nbtData: {
                type: 'compound',
                name: '',
                value: {
                    display: {
                        type: 'compound',
                        value: {
                            Name: { type: 'string', value: `§a${name}` },
                            Lore: {
                                type: 'list',
                                value: {
                                    type: 'string',
                                    value: [
                                        `§7Use §6${usage}§7.`,
                                        "",
                                        "§eClick to Play!",
                                        "§7Add amount playing logic here"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            click: ({ target }) => {
                target.write('chat', { message: `/play ${command}` });
            }
        }
    };
}

const closeItem =
{
    item: {
        blockId: 166,
        itemCount: 1,
        itemDamage: 0,
        nbtData: {
            type: 'compound',
            name: '',
            value: {
                display: {
                    type: 'compound',
                    value: {
                        Name: { type: 'string', value: '§cClose' }
                    }
                }
            }
        },
        click: ({ client }) => {
            closeGUI(client, 1)
        }
    },
}

function navigateItem(blockId, itemCount, itemDamage, name, lore, lore2, gui) {
    return {
        item: {
            blockId,
            itemCount,
            itemDamage,
            nbtData: {
                type: 'compound',
                name: '',
                value: {
                    display: {
                        type: 'compound',
                        value: {
                            Name: { type: 'string', value: `${name}` },
                            Lore: {
                                type: 'list',
                                value: {
                                    type: 'string',
                                    value: [lore, lore2].filter(Boolean)
                                }
                            }
                        }
                    }
                }
            },
            click: ({ client, target }) => {
                createGUI(client, 'navigate', 1, `${gui}`, target)
            }
        }
    };
}

module.exports = {
    playItem, closeItem, navigateItem
}