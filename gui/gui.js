const log = require('../setup/log.js')
const prefix = require('../setup/prefix.js');
const { closeGUI, createGUI } = require('./setup.js');
const { playItem, closeItem, navigateItem } = require('./helpers.js');

module.exports = {
    /** 
     *  Comments should only be for the test gui.
     *  If you are contributing to this file, use #region to mark your work. Use Ctrl+K & Ctrl+8 for easy use. 
     *  When using createGUI, set windowId to 1, unless you are opening mulitple GUIs after one another.
     *  If unsure, use another number (if you use 67 you will be shot).
    **/
    //#region TEST GUIS
    //#region test
    test: {
        title: "TEST GUI", // Name of container
        type: "minecraft:chest", // Type of container
        slotCount: 27, // Slot Count of container - Chests can have a custom number which is a multiple of 9.
        slots: {
            0: { // Slot position
                item: {
                    blockId: 1, // https://www.digminecraft.com/lists/item_id_list_pc_1_8.php
                    itemCount: 1, // Self-Explanitory
                    itemDamage: 0, // Mc Data Value, e.g. 1 with Stone will be Granite.
                    nbtData: {
                        type: 'compound',
                        name: '', // KEEP BLANK
                        value: {
                            display: {
                                type: 'compound',
                                value: {
                                    Name: { type: 'string', value: '§fTEST ITEM' }, // Name of Item
                                    Lore: {
                                        type: 'list',
                                        value: {
                                            type: 'string',
                                            value: [
                                                "§aThis is the first line of lore", // Lore of the Item
                                                "§6This is the second line",
                                                "§cAnd this is the third line"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    click: ({ client }) => { // Click Events
                        client.write('chat', {
                            message: JSON.stringify({ text: `${prefix}§7Item Clicked.` }),
                            position: 0
                        });
                    }
                },
            },
            26: closeItem,
            1: {
                item: {
                    blockId: 2,
                    itemCount: 1,
                    itemDamage: 0,
                    nbtData: {
                        type: 'compound',
                        name: '',
                        value: {
                            display: {
                                type: 'compound',
                                value: {
                                    Name: { type: 'string', value: '§fOpen Second GUI' }
                                }
                            }
                        }
                    },
                    click: ({ client }) => {
                        createGUI(client, 'navigate', 1, 'test2')
                        /** 
                         * Use 'navigate' - although the word can be anything except "open".
                         * This populates the GUI with new Items, and prevents the mouse from resetting.
                        **/
                    }
                },

            }
        }
    },
    //#endregion test
    //#region test2
    test2: {
        title: "TEST GUI", // Title won't be changed if opening GUI using 'navigate'
        type: "minecraft:chest",
        slotCount: 27,
        slots: {
            0: {
                item: {
                    blockId: 38,
                    itemCount: 1,
                    itemDamage: 0,
                    nbtData: {
                        type: 'compound',
                        name: '',
                        value: {
                            display: {
                                type: 'compound',
                                value: {
                                    Name: { type: 'string', value: '§fThanks for Downloading!' },
                                }
                            },
                            ench: { // Enchantment
                                type: 'list',
                                value: {
                                    type: 'compound',
                                    value: [
                                        { id: { type: 'short', value: 0 }, lvl: { type: 'short', value: 1 } }
                                    ]
                                }
                            },
                            HideFlags: { type: 'int', value: 1 } // Hide Enchantment
                        }
                    }
                }
            },
            26: closeItem
        }
    },
    //#endregion test2
    //#endregion TEST GUIS
    //#region PLAY COMMANDS
    //#region playArcade
    playArcade: {
        title: "Arcade Games",
        type: "minecraft:chest",
        slotCount: 54,
        slots: {
            10: playItem(367, 1, 0, 'Blocking Dead', 'arcade_day_one', '/play blockingdead'),
            11: playItem(261, 1, 0, 'Bounty Hunters', 'arcade_bounty_hunters', '/play bountyhunters'),
            12: playItem(397, 1, 4, 'Creeper Attack', 'arcade_creeper_defense', '/play creeperattack'),
            13: playItem(122, 1, 0, 'Dragon Wars', 'arcade_dragon_wars', '/play dragonwars'),
            14: playItem(154, 1, 0, 'Dropper', 'arcade_dropper', '/play dropper'),
            15: playItem(368, 1, 0, 'Ender Spleef', 'arcade_ender_spleef', '/play enderspleef'),
            16: playItem(383, 1, 91, 'Farm Hunt', 'arcade_farm_hunt', '/play farmhunt'),
            19: playItem(397, 1, 3, 'Football', 'arcade_soccer', '/play football'),
            20: playItem(401, 1, 0, 'Galaxy Wars', 'arcade_starwars', '/play galaxywars'),
            21: playItem(46, 1, 0, 'Prop Hunt', 'arcade_hide_and_seek_prop_hunt', '/play prophunt'),
            22: playItem(369, 1, 0, 'Party Pooper', 'arcade_hide_and_seek_party_pooper', '/play partypooper'),
            23: playItem(45, 1, 0, 'Hole in the Wall', 'arcade_hole_in_the_wall', '/play hitw'),
            24: playItem(357, 1, 0, 'Hypixel Says', 'arcade_simon_says', '/play hypixelsays'),
            25: playItem(35, 1, 5, 'Mini Walls', 'arcade_mini_walls', '/play miniwalls'),
            28: playItem(354, 1, 0, 'Party Games', 'arcade_party_games_1', '/play partygames'),
            29: playItem(351, 1, 9, 'Pixel Painters', 'arcade_pixel_painters', '/play pixelpainters'),
            30: playItem(2256, 1, 0, 'Pixel Party', 'arcade_pixel_party', '/play pixelparty'),
            31: playItem(332, 1, 0, 'Throw Out', 'arcade_throw_out', '/play throwout'),
            32: navigateItem(397, 1, 2, '§aZombies', '§eClick to Play!', '§7add player amounts here', 'playZombies'),
            49: closeItem

        },
    },
    //#endregion playArcade
    //#region playZombies
    playZombies: {
        title: "Arcade Games",
        type: "minecraft:chest",
        slotCount: 54,
        slots: {
            19: playItem(397, 1, 2, 'Dead End', 'arcade_zombies_dead_end', '/play zombies de'),
            21: playItem(397, 2, 2, 'Bad Blood', 'arcade_zombies_bad_blood', '/play zombies bb'),
            23: playItem(397, 3, 2, 'Alien Arcadium', 'arcade_zombies_alien_arcadium', '/play zombies aa'),
            25: playItem(397, 4, 2, 'Prison', 'arcade_zombies_prison', '/play zombies p'),
            49: navigateItem(262, 1, 0, '§aGo Back', '§7To Arcade Games', null, 'playArcade')
        }
    },
    //#endregion playZombies
    //#region CLASSIC
    playClassic: {
        title: "Classic Games",
        type: "minecraft:chest",
        slotCount: 36,
        slots: {
            10: playItem(397, 1, 1, 'VampireZ', 'vampirez', '/play vampz'),
            11: navigateItem(401, 1, 0, '§aQuakecraft', '§eClick to Play!', '§7add player amounts here', 'playQuake'),
            12: playItem(332, 1, 0, 'Paintball', 'paintball', '/play paintball'),
            14: navigateItem(377, 1, 0, '§aArena Brawl', '§eClick to Play!', '§7add player amounts here', 'playArena'),
            15: playItem(12, 1, 0, 'The Walls', 'walls', '/play walls'),
            16: playItem(328, 1, 0, 'Turbo Kart Racers', 'tkr', '/play tkr'),
            31: closeItem
        }
    },
    //#region playArena
    playArena: {
        title: "Classic Games",
        type: "minecraft:chest",
        slotCount: 36,
        slots: {
            11: playItem(377, 1, 0, '1v1 Arena Brawl', 'arena_1v1', '/play arena solo'),
            13: playItem(377, 2, 0, '2v2 Arena Brawl', 'arena_2v2', '/play arena duos'),
            15: playItem(377, 4, 0, '4v4 Arena Brawl', 'arena_4v4', '/play arena teams'),
            31: navigateItem(262, 1, 0, '§aGo Back', '§7To Classic Games', null, 'playClassic')
        }
    },
    //#endregion playArena
    //#region playQuake
    playQuake: {
        title: "Classic Games",
        type: "minecraft:chest",
        slotCount: 36,
        slots: {
            11: playItem(401, 8, 0, 'Solo Quakecraft', 'quake_solo', '/play quake solo'),
            13: playItem(401, 16, 0, 'Teams Quakecraft', 'quake_teams', '/play quake teams'),
            15: playItem(401, 2, 0, 'Quakecraft Duel', 'duels_quake_duel', '/play duels quake'),
            31: navigateItem(262, 1, 0, '§aGo Back', '§7To Classic Games', null, 'playClassic')
        }
    },
    //#endregion playQuake
    //#endregion CLASSIC
    //#region playBedwars     remove modes based on rotation ???
    playBedwars: {
        title: "Bedwars",
        type: "minecraft:chest",
        slotCount: 54,
        slots: {
            10: playItem(355, 1, 0, 'Bed Wars (Solo)', 'bedwars_eight_one', '/play bedwars solo'),
            11: playItem(355, 2, 0, 'Bed Wars (Doubles)', 'bedwars_eight_two', '/play bedwars duos'),
            12: playItem(355, 3, 0, 'Bed Wars (3v3v3v3)', 'bedwars_four_three', '/play bedwars trios'),
            13: playItem(355, 4, 0, 'Bed Wars (4v4v4v4)', 'bedwars_four_four', '/play bedwars teams'),
            14: playItem(355, 8, 0, 'Bed Wars (4v4)', 'bedwars_two_four', '/play bedwars 4v4'),
            15: playItem(267, 1, 0, 'Bed Wars Duel - 1v1', 'bedwars_two_one_duels', '/play bedwars duel'),
            16: playItem(35, 1, 14, 'Bed Rush Duel - 1v1', 'bedwars_two_one_duels_rush', '/play bedwars duel rush'),
            19: playItem(381, 2, 0, 'Rush Doubles', 'bedwars_eight_two_rush', '/play bedwars rush duos'),
            20: playItem(381, 4, 0, 'Rush 4v4v4v4', 'bedwars_four_four_rush', '/play bedwars rush teams'),
            21: playItem(399, 2, 0, 'Ultimate Doubles', 'bedwars_eight_two_ultimate', '/play bedwars ultimate duos'),
            22: playItem(399, 4, 0, 'Ultimate 4v4v4v4', 'bedwars_four_four_ultimate', '/play bedwars ultimate teams'),
            23: playItem(35, 2, 1, 'LuckyV2 Doubles', 'bedwars_eight_two_lucky', '/play bedwars lucky duos'), // add player heads l8r
            24: playItem(35, 4, 1, 'LuckyV2 4v4v4v4', 'bedwars_four_four_lucky', '/play bedwars lucky teams'),
            25: playItem(293, 2, 0, 'Armed Doubles', 'bedwars_eight_two_armed', '/play bedwars armed duos'),
            28: playItem(293, 4, 0, 'Armed 4v4v4v4', 'bedwars_four_four_armed', '/play bedwars armed teams'),
            29: playItem(7, 2, 0, 'Voidless Doubles', 'bedwars_eight_two_voidless', '/play bedwars voidless duos'),
            30: playItem(7, 4, 0, 'Voidless 4v4v4v4', 'bedwars_four_four_voidless', '/play bedwars voidless teams'),
            31: playItem(120, 2, 0, 'Swappage Doubles', 'bedwars_eight_two_swap', '/play bedwars swap duos'),
            32: playItem(120, 4, 0, 'Swappage 4v4v4v4', 'bedwars_four_four_swap', '/play bedwars swap teams'),
            33: playItem(98, 40, 0, 'Castle', 'bedwars_castle', '/play bedwars castle'),
            34: playItem(355, 1, 0, 'One Block', 'bedwars_one_block', '/play bedwars oneblock'),
            49: closeItem
        }
    },
    //#endregion playBedwars
    //#region playBlitz
    playBlitz: {
        title: 'Blitz Survival Games',
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(399, 1, 0, 'BlitzSG Solo', 'blitz_solo_normal', '/play blitz solo'),
            13: playItem(399, 2, 0, 'BlitzSG Teams', 'blitz_teams_normal', '/play blitz teams'),
            15: playItem(276, 1, 0, 'Blitz Duel', 'duels_blitz_duel', '/play blitz duel'),
            31: closeItem
        }
    },
    //#endregion playBlitz
    //#region playBuildBattle
    playBuildBattle: {
        title: 'Build Battle',
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: playItem(58, 1, 0, 'Build Battle Solo', 'build_battle_solo_normal', '/play bb solo'),
            11: playItem(58, 2, 0, 'Build Battle Teams', 'build_battle_teams_normal', '/play bb teams'),
            13: playItem(288, 1, 0, 'Speed Builders', 'build_battle_speed_builders', '/play bb speed'),
            15: playItem(386, 1, 0, 'Guess the Build', 'build_battle_guess_the_build', '/play bb gtb'),
            16: playItem(264, 1, 0, 'Build Battle Pro', 'build_battle_solo_pro', '/play bb pro'),
            31: closeItem
        }
    },
    //#endregion playBuildBattle
    //#region playMCGO
    playMCGO: {
        title: 'Cops and Crims',
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(46, 1, 0, 'Defusal', 'mcgo_normal', '/play mcgo defusal'),
            13: playItem(291, 1, 0, 'Deathmatch', 'mcgo_deathmatch', '/play mcgo tdm'),
            15: playItem(285, 1, 0, 'Gun Game', 'mcgo_gungame', '/play mcgo ffa'),
            31: closeItem
        }
    },
    //#endregion playMCGO
    //#region playDuels
    playDuels: {
        title: "Duels",
        type: "minecraft:chest",
        slotCount: 54,
        slots: {
            10: playItem(138, 32, 0, 'Arena Duel', 'duels_duel_arena', '/play duels arena'),
            11: playItem(355, 1, 0, 'Bed Wars Duel', 'bedwars_two_one_duels', '/play duels bw'),
            12: playItem(35, 1, 14, 'Bed Rush Duel', 'bedwars_two_one_duels_rush', '/play duels bw rush'),
            13: playItem(276, 1, 0, 'Blitz Duel', 'duels_blitz_duel', '/play duels blitz'),
            14: playItem(261, 1, 0, 'Bow Duel', 'duels_bow_duel', '/play duels bow'),
            15: playItem(46, 1, 0, 'Bowspleef Duel', 'duels_bowspleef_duel', '/play duels bowspleef'),
            16: playItem(349, 1, 0, 'Boxing Duel', 'duels_boxing_duel', '/play duels boxing'),
            19: playItem(159, 1, 11, 'Bridge Duel', 'duels_bridge_duel', '/play bridge'),
            20: playItem(159, 2, 11, 'Bridge Doubles', 'duels_bridge_doubles', '/play bridge duos'),
            21: playItem(159, 3, 11, 'Bridge Threes', 'duels_bridge_threes', '/play bridge trios'),
            22: playItem(159, 4, 11, 'Bridge Teams', 'duels_bridge_four', '/play bridge teams'),
            23: playItem(346, 1, 0, 'Classic Duel', 'duels_classic_duel', '/play duels classic'),
            24: playItem(346, 2, 0, 'Classic Doubles', 'duels_classic_doubles', '/play duels classic duos'),
            25: playItem(368, 1, 0, 'Combo Duel', 'duels_combo_duel', '/play duels combo'),
            28: playItem(88, 1, 0, 'Mega Walls Duel', 'duels_mw_duel', '/play duels mw'),
            29: playItem(379, 1, 0, 'NoDebuff Duel', 'duels_potion_duel', '/play duels ndb'),
            30: playItem(311, 1, 0, 'OP Duel', 'duels_op_duel', '/play duels op'), // give enchanted glint l8r
            31: playItem(311, 2, 0, 'OP Doubles', 'duels_op_doubles', '/play duels op duos'), // ^^
            32: playItem(401, 1, 0, 'Quakecraft Duel', 'duels_quake_duel', '/play duels quake'),
            33: playItem(288, 8, 0, 'Parkour Duels', 'duels_parkour_eight', '/play duels parkour'),
            34: playItem(381, 1, 0, 'SkyWars Duel', 'duels_sw_duel', '/play duels sw'),
            37: playItem(381, 2, 0, 'SkyWars Doubles', 'duels_sw_doubles', '/play duels sw duos'),
            38: playItem(256, 1, 0, 'Spleef Duel', 'duels_spleef_duel', '/play duels spleef'),
            39: playItem(341, 1, 0, 'Sumo Duel', 'duels_sumo_duel', '/play duels sumo'),
            40: playItem(322, 1, 0, 'UHC Duel', 'duels_uhc_duel', '/play duels uhc'),
            41: playItem(322, 2, 0, 'UHC Doubles', 'duels_uhc_doubles', '/play duels uhc duos'),
            42: playItem(322, 4, 0, 'UHC Teams', 'duels_uhc_four', '/play duels uhc teams'),
            43: playItem(322, 8, 0, 'UHC Deathmatch', 'duels_uhc_meetup', '/play duels uhc ffa'),
            49: closeItem
        }
    },
    //#endregion playDuels
    //#region playMW
    playMW: {
        title: "Mega Walls",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(267, 1, 0, 'Mega Walls Standard', 'mw_standard', '/play mw standard'),
            13: playItem(283, 1, 0, 'Mega Walls Face Off', 'mw_face_off', '/play mw faceoff'),
            15: playItem(88, 1, 0, 'Mega Walls Duel', 'duels_mw_duel', '/play mw duel'),
            31: closeItem
        }
    },
    //#endregion playMW
    //#region playMM
    playMM: {
        title: "Murder Mystery",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: playItem(261, 1, 0, 'Classic', 'murder_classic', '/play mm classic'),
            12: playItem(261, 2, 0, 'Double Up', 'murder_double_up', '/play mm duos'),
            14: playItem(267, 1, 0, 'Assassins', 'murder_assassins', '/play mm assassins'),
            16: playItem(397, 1, 2, 'Infection', 'murder_infection', '/play mm infection'),
            31: closeItem
        }
    },
    //#endregion playMM
    //#region playSW
    playSW: {
        title: "SkyWars",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: navigateItem(368, 1, 0, '§aSkyWars (Normal)', '§eClick to Play!', '§7add player amounts here', 'playSWN'),
            11: playItem(399, 1, 0, 'Skywars (Solo Insane)', 'solo_insane', '/play sw insane'),
            12: navigateItem(381, 1, 0, '§aSkyWars Duels', '§eClick to Play!', '§7add player amounts here', 'playSWD'),
            14: playItem(368, 4, 0, 'SkyWars (Mini)', 'mini_normal', '/play mm infection'),
            15: playItem(368, 40, 0, 'SkyWars (Mega)', 'mega_doubles', '/play mm infection'),
            16: navigateItem(35, 1, 1, '§aLucky Blocks', '§eClick to Play!', '§7add player amounts here', 'playSWLB'),
            31: closeItem
        }
    },
    playSWN: {
        title: "SkyWars",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(368, 1, 0, 'SkyWars (Solo Normal)', 'solo_normal', '/play sw normal'),
            15: playItem(368, 2, 0, 'SkyWars (Doubles Normal)', 'teams_normal', '/play sw normal duos'),
            31: navigateItem(262, 1, 0, '§aGo Back', '§7To SkyWars', null, 'playSW')
        }
    },
    playSWD: {
        title: "SkyWars",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(381, 1, 0, 'SkyWars Duel', 'duels_sw_duel', '/play sw duel'),
            15: playItem(381, 2, 0, 'SkyWars Doubles', 'duels_sw_doubles', '/play sw duel duos'),
            31: navigateItem(262, 1, 0, '§aGo Back', '§7To SkyWars', null, 'playSW')
        }
    },
    playSWLB: {
        title: "SkyWars",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(35, 1, 1, 'Lucky Blocks (Solo)', 'duels_sw_duel', '/play sw lucky'),
            15: playItem(35, 2, 1, 'Lucky Blocks (Doubles)', 'duels_sw_doubles', '/play sw lucky duos'),
            31: navigateItem(262, 1, 0, '§aGo Back', '§7To SkyWars', null, 'playSW')
        }
    },
    //#endregion playSW
    //#region playSMH
    playSMH: {
        title: 'Build Battle',
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: playItem(35, 1, 0, 'Smash Heroes Solo', 'super_smash_solo_normal', '/play smh solo'),
            11: playItem(35, 2, 0, 'Smash Heroes Teams', 'super_smash_teams_normal', '/play smh teams'),
            13: playItem(35, 1, 3, 'Smash Heroes Friends', 'super_smash_friends_normal', '/play smh friends'),
            15: playItem(35, 1, 14, 'Smash Heroes Solo Duel', 'super_smash_1v1_normal', '/play smh duels'),
            16: playItem(35, 2, 14, 'Smash Heroes Teams Duel', 'super_smash_2v2_normal', '/play smh duels duos'),
            31: closeItem
        }
    },
    //#endregion playSMH
    //#region playTNT
    playTNT: {
        title: 'TNT Games',
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: playItem(261, 1, 0, 'Bow Spleef', 'tnt_bowspleef', '/play tnt bowspleef'),
            11: playItem(267, 1, 0, 'PVP Run', 'tnt_pvprun', '/play tnt pvp'),
            12: playItem(288, 1, 0, 'TNT Run', 'tnt_tntrun', '/play tnt run'),
            14: playItem(46, 1, 0, 'TNT Tag', 'tnt_tntag', '/play tnt tag'),
            15: playItem(116, 1, 0, 'Wizards', 'tnt_capture', '/play tnt wizards'),
            16: playItem(46, 1, 0, 'Bow Spleef Duel', 'duels_bowspleef_duel', '/play tnt duel'),
            31: closeItem
        }
    },
    //#endregion playTNT
    //#region playUHC        add uhc duels blah blah blah lawl
    playUHC: {
        title: "UHC",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            10: playItem(322, 1, 0, 'UHC Solo', 'uhc_solo', '/play uhc solo'),
            12: playItem(322, 2, 0, 'UHC Teams', 'uhc_teams', '/play uhc teams'),
            14: playItem(396, 1, 0, 'Speed UHC Solo', 'speed_solo_normal', '/play uhc speed'),
            16: playItem(396, 2, 0, 'Speed UHC Teams', 'speed_team_normal', '/play uhc speed duos'),
            31: closeItem
        }
    },
    //#endregion playUHC
    //#region playWarlords
    playWarlords: {
        title: "Warlords",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(271, 1, 0, 'Capture The Flag', 'warlords_ctf_mini', '/play warlords ctf'),
            13: playItem(275, 1, 0, 'Domination', 'warlords_domination', '/play warlords dom'),
            15: playItem(258, 1, 0, 'Team Deathmatch', 'warlords_team_deathmatch', '/play warlords ctf'),
            31: closeItem
        }
    },
    //#endregion playWarlords
    //#region playWool
    playWool: {
        title: "Wool Games",
        type: 'minecraft:chest',
        slotCount: 36,
        slots: {
            11: playItem(35, 1, 1, 'Capture The Wool', 'wool_capture_the_wool_two_twenty', '/play wool ctf'),
            13: playItem(261, 1, 0, 'Sheep Wars', 'wool_sheep_wars_two_six', '/play wool sheep'),
            15: playItem(267, 1, 0, 'Wool Wars', 'wool_wool_wars_two_four', '/play wool wars'),
            31: closeItem
        }
    },
    //#endregion playWool
    //#endregion PLAY COMMANDS
}



