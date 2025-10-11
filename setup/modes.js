function selectMode(mode, subMode, subSubMode) {
    switch (mode) {
        // #region ARCADE (VAR)
        // ================== ARCADE ==================
        case 'blockingdead':
        case 'dayone':
        case 'bkd':
            return 'arcade_day_one';
        case 'bountyhunters':
        case 'bth':
            return 'arcade_bounty_hunters';
        case 'creeperattack':
        case 'cpt':
            return 'arcade_creeper_defense';
        case 'dragonwars':
        case 'dw':
            return 'arcade_dragon_wars';
        case 'dropper':
        case 'dr':
            return 'arcade_dropper';
        case 'enderspleef':
        case 'esp':
            return 'arcade_ender_spleef';
        case 'farmhunt':
        case 'fht':
            return 'arcade_farm_hunt';
        case 'football':
        case 'soccer':
        case 'ftb':
            return 'arcade_soccer';
        case 'galaxywars':
        case 'starwars':
        case 'gxw':
            return 'arcade_starwars';
        case 'hideandseekprop':
        case 'prophunt':
        case 'hideandseekprophunt':
        case 'hasph':
            return 'arcade_hide_and_seek_prop_hunt';
        case 'hideandseekparty':
        case 'hideandseekpartypooper':
        case 'partypooper':
        case 'haspp':
            return 'arcade_hide_and_seek_party_pooper';
        case 'holeinthewall':
        case 'hitw':
            return 'arcade_hole_in_the_wall';
        case 'hypixelsays':
        case 'simonsays':
        case 'ssy':
        case 'hsy':
            return 'arcade_simon_says';
        case 'miniwalls':
        case 'miw':
            return 'arcade_mini_walls';
        case 'partygames':
        case 'pyg':
            return 'arcade_party_games_1';
        case 'pixelparty':
        case 'ppy':
            return 'arcade_pixel_party';
        case 'pixelpainters':
        case 'ppt':
            return 'arcade_pixel_painters';
        case 'throwout':
        case 'thw':
            return 'arcade_throw_out';
        case 'zombiesde':
        case 'zombiesdeadend':
            return 'arcade_zombies_dead_end';
        case 'zombiesbadblood':
        case 'zombiesbb':
            return 'arcade_zombies_bad_blood';
        case 'zombiesalienarcadium':
        case 'zombiesaa':
            return 'arcade_zombies_alien_arcadium';
        case 'zombiesprison':
        case 'zombiesp':
            return 'arcade_zombies_prison';
        case 'halloweensim':
        case 'hsm':
            return 'arcade_halloween_simulator';
        case 'eastersim':
        case 'esm':
            return 'arcade_easter_simulator';
        case 'scubasim':
        case 'summersim':
        case 'ssm':
            return 'arcade_scuba_simulator';
        case 'holidaysim':
        case 'grinchsim':
        case 'grinchsimv2':
        case 'gsm':
            return 'arcade_grinch_simulator_v2';
        case 'santasays':
        case 'sty':
            return 'arcade_santa_says';
        //#endregion
        // #region ARENABRAWL (ABW)
        // ================== ARENA BRAWL ==================
        case 'arena':
        case 'arenabrawl':
        case 'abw':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                case '1':
                case '1v1':
                    return 'arena_1v1'
                case 'doubles':
                case '2':
                case '2v2':
                    return 'arena_2v2'
                case 'teams':
                case '4':
                case '4v4':
                    return 'arena_4v4'
                default:
                    return null;
            }
        // #endregion ARENABRAWL
        // #region BEDWARS (BW)
        // ================== BEDWARS ==================
        case 'bedwars':
        case 'bw':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return 'bedwars_eight_one'
                case 'doubles':
                case 'duos':
                    return 'bedwars_eight_two'
                case 'trios':
                    return 'bedwars_four_three'
                case 'teams':
                case '4v4v4v4':
                    return 'bedwars_four_four'
                case '4v4':
                    return 'bedwars_two_four'
                case 'rush':
                case 'ultimate':
                case 'lucky':
                case 'armed':
                case 'voidless':
                case 'swap':
                    if (!subSubMode) return `bedwars_eight_two_${subMode}`;
                    switch (subSubMode) {
                        case 'doubles':
                        case 'duos':
                            return `bedwars_eight_two_${subMode}`;
                        case 'teams':
                        case '4v4v4v4':
                            return `bedwars_four_four_${subMode}`;
                        default:
                            return null;
                    }
                case 'castle':
                    return 'bedwars_castle'
                case 'oneblock':
                    return 'bedwars_one_block'
                case 'duel':
                    if (!subSubMode) return 'bedwars_two_one_duels'
                    switch (subSubMode) {
                        case 'rush':
                            return `bedwars_two_one_duels_rush`;
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion BEDWARS
        // #region BLITZSG (BSG)
        // ================== BLITZSG ==================
        case 'blitz':
        case 'bsg':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return 'blitz_solo_normal'
                case 'teams':
                    return 'blitz_teams_normal'
                case 'duel':
                    return 'duels_blitz_duel'
                default:
                    return null;
            }
        // #endregion BLITZSG
        // #region BUILDBATTLE (BB)
        // ================== BUILD BATTLE ==================
        case 'buildbattle':
        case 'bb':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return 'build_battle_solo_normal'
                case 'teams':
                    return 'build_battle_teams_normal'
                case 'speed':
                case 'speedbuild':
                case 'speedbuilders':
                    return 'build_battle_speed_builders'
                case 'guessthebuild':
                case 'guess':
                case 'gtb':
                    return 'build_battle_guess_the_build'
                case 'pro':
                    return 'build_battle_solo_pro'
                default:
                    return null;
            }
        // #endregion BUILDBATTLE
        // #region COPSANDCRIMS (MCGO)
        // ================== COPS AND CRIMS ==================
        case 'copsandcrims':
        case 'mcgo':
            if (!subMode) return null;
            switch (subMode) {
                case 'defusal':
                case 'de':
                    return 'mcgo_normal'
                case 'tdm':
                case 'deathmatch':
                    return 'mcgo_deathmatch'
                case 'gungame':
                case 'gg':
                case 'ffa':
                    return 'mcgo_gungame'
                case 'party':
                    if (!subSubMode) return null;
                    switch (subSubMode) {
                        case 'defusal':
                        case 'de':
                            return 'mcgo_normal_party'
                        case 'tdm':
                        case 'deathmatch':
                            return 'mcgo_deathmatch_party'
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion COPSANDCRIMS
        // #region DUELS
        // ================== DUELS ==================
        case 'duels':
        case 'duel':
            if (!subMode) return null;
            switch (subMode) {
                case 'arena':
                    return 'duels_duel_arena'
                case 'potion':
                case 'nodebuff':
                case 'ndb':
                    return 'duels_potion_duel'
                case 'parkour':
                case 'pkr':
                    return 'duels_parkour_eight'
                case 'megawalls':
                case 'mwd':
                    return 'duels_mw_duel'
                case 'bedwars':
                    if (!subSubMode) return 'bedwars_two_one_duels'
                    switch (subSubMode) {
                        case 'rush':
                            return `bedwars_two_one_duels_rush`;
                        default:
                            return null;
                    }
                case 'blitz':
                case 'bow':
                case 'boxing':
                case 'combo':
                case 'quake':
                case 'spleef':
                case 'bowspleef':
                case 'sumo':
                case 'mw':
                    return `duels_${subMode}_duel`;
                case 'bridge':
                    if (!subSubMode) return 'duels_bridge_duel'
                    switch (subSubMode) {
                        case 'solo':
                            return 'duels_bridge_duel'
                        case 'doubles':
                        case 'duos':
                            return 'duels_bridge_doubles'
                        case 'trios':
                            return 'duels_bridge_threes'
                        case 'fours':
                        case 'teams':
                            return 'duels_bridge_four'
                        default:
                            return null;
                    }
                case 'classic':
                case 'op':
                    if (!subSubMode) return `duels_${subMode}_duel`
                    switch (subSubMode) {
                        case 'solo':
                            return `duels_${subMode}_duel`
                        case 'doubles':
                        case 'duos':
                            return `duels_${subMode}_doubles`
                        default:
                            return null;
                    }
                case 'skywars':
                case 'swd':
                case 'sw':
                    if (!subSubMode) return `duels_sw_duel`
                    switch (subSubMode) {
                        case 'solo':
                            return `duels_sw_duel`
                        case 'doubles':
                        case 'duos':
                            return `duels_sw_doubles`
                        default:
                            return null;
                    }
                case 'uhc':
                    if (!subSubMode) return `duels_uhc_duel`
                    switch (subSubMode) {
                        case 'solo':
                            return `duels_uhc_duel`
                        case 'doubles':
                        case 'duos':
                            return `duels_uhc_doubles`
                        case 'fours':
                        case 'teams':
                            return `duels_uhc_four`
                        case 'meetup':
                        case 'deathmatch':
                        case 'ffa':
                            return `duels_uhc_meetup`
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion DUELS
        // #region MEGAWALLS (MW)
        // ================== MEGA WALLS ==================
        case 'megawalls':
        case 'mw':
            if (!subMode) return null;
            switch (subMode) {
                case 'standard':
                case 'std':
                    return 'mw_standard'
                case 'faceoff':
                case 'fof':
                    return 'mw_face_off'
                case 'duel':
                    return 'duels_mw_duel'
                default:
                    return null;
            }
        // #endregion MEGAWALLS
        // #region MURDERMYSTERY (MM)
        // ================== MURDER MYSTERY ==================
        case 'murdermystery':
        case 'murder':
        case 'mm':
            if (!subMode) return null;
            switch (subMode) {
                case 'classic':
                case 'clc':
                    return 'murder_classic'
                case 'doubles':
                case 'duos':
                    return 'murder_double_up'
                case 'assassins':
                case 'asn':
                    return 'murder_assassins'
                case 'infection':
                case 'inf':
                    return 'murder_infection'
                default:
                    return null;
            }
        // #endregion MURDERMYSTERY
        // #region CLASSICGAMES (VAR)
        // ================== CLASSIC GAMES ==================
        case 'paintball':
        case 'ptb':
            return 'paintball'
        case 'quake':
        case 'quakecraft':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return 'quake_solo'
                case 'teams':
                    return 'quake_teams'
                default:
                    return null;
            }
        case 'tkr':
        case 'turbokartracers':
            return 'tkr'
        case 'walls':
            return 'walls'
        case 'vampirez':
        case 'vampz':
            return 'vampirez'
        // #endregion CLASSICGAMES
        case 'pit':
            return 'pit'
        // #region SKYWARS (SW)
        // ================== SKYWARS ==================
        case 'skywars':
        case 'sw':
            if (!subMode) return null;
            switch (subMode) {
                case 'normal':
                case 'insane':
                    if (!subSubMode) return `solo_${subMode}`;
                    switch (subSubMode) {
                        case 'solo':
                            return `solo_${subMode}`
                        case 'doubles':
                        case 'duos':
                            return `solo_${subMode}`
                        default:
                            return null;
                    }
                case 'mini':
                    return 'mini_normal'
                case 'mega':
                    return 'mega_doubles'
                case 'lucky':
                    return 'solo_insane_lucky'
                case 'duel':
                    if (!subSubMode) return `duels_sw_duel`
                    switch (subSubMode) {
                        case 'solo':
                            return `duels_sw_duel`
                        case 'doubles':
                        case 'duos':
                            return `duels_sw_doubles`
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion SKYWARS
        // #region SMASHHEROES (SMH)
        // ================== SMASH HEROES ==================
        case 'smash':
        case 'smashheroes':
        case 'smh':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return 'super_smash_solo_normal'
                case 'teams':
                    return ' super_smash_teams_normal'
                case 'friends':
                case 'fnd':
                    return 'super_smash_friends_normal'
                case 'duels':
                    if (!subSubMode) return `super_smash_1v1_normal`;
                    switch (subSubMode) {
                        case 'solo':
                            return `super_smash_1v1_normal`
                        case 'doubles':
                        case 'duos':
                            return `super_smash_2v2_normal`
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion SMASHHEROES
        // #region TNTGAMES (TNT)
        // ================== TNT GAMES ==================
        case 'tnt':
        case 'tntgames':
            if (!subMode) return null;
            switch (subMode) {
                case 'tntrun':
                case 'trn':
                    return 'tnt_tntrun'
                case 'pvprun':
                case 'prn':
                    return ' tnt_pvprun'
                case 'bowspleef':
                case 'bsf':
                    return 'tnt_bowspleef'
                case 'tag':
                    return 'tnt_tntag'
                case 'wizards':
                case 'wzd':
                    return 'tnt_capture'
                case 'duels':
                    return 'duels_bowspleef_duel'
                default:
                    return null;
            }
        // #endregion TNTGAMES
        // #region UHC
        // ================== UHC ==================
        case 'uhc':
        case 'speeduhc':
            if (!subMode) return null;
            switch (subMode) {
                case 'solo':
                    return ' uhc_solo'
                case 'teams':
                    return ' uhc_teams'
                case 'speed':
                    if (!subSubMode) return `speed_solo_normal`;
                    switch (subSubMode) {
                        case 'solo':
                            return `speed_solo_normal`
                        case 'doubles':
                        case 'duos':
                            return `speed_team_normal`
                        default:
                            return null;
                    }
                default:
                    return null;
            }
        // #endregion UHC
        // #region WARLORDS (WRL)
        // ================== WARLORDS ==================
        case 'warlords':
        case 'wrl':
            if (!subMode) return null;
            switch (subMode) {
                case 'domination':
                case 'dom':
                    return ' warlords_domination'
                case 'teamdeathmatch':
                case 'tdm':
                    return ' warlords_team_deathmatch'
                case 'capturetheflag':
                case 'ctf':
                    return ' warlords_ctf_mini'
            }
        // #endregion WARLORDS
        // #region WOOLGAMES (WG)
        // ================== WOOL GAMES ==================
        case 'woolgames':
        case 'wool':
        case 'wg':
            if (!subMode) return null;
            switch (subMode) {
                case 'capturethewool':
                case 'ctf':
                case 'ctw':
                    return 'wool_capture_the_wool_two_twenty'
                case 'sheepwars':
                case 'spw':
                    return ' wool_sheep_wars_two_six'
                case 'woolwars':
                case 'ww':
                    return 'wool_wool_wars_two_four'
                default:
                    return null;
            }
        // #endregion WOOLGAMES
        default:
            return null;
    }
}

module.exports = { selectMode }