const log = require('../../setup/log.js')
const prefix = require('../../setup/prefix.js')
const { location } = require('../../location/parseLocraw.js')
const { getSettings, writeSettings } = require('../../settings/getSettings.js')
const { xpBar } = require('../../renameMe/xpBar.js')
const { loadInventory, clearInventoryCache, inventoryCache, displayInventory } = require('../../gui/inventory.js')
const { createGUI } = require('../../gui/setup.js')
const { test } = require('../../gui/gui.js')
const { playSoundAtPosition } = require('../../renameMe/sound.js')


module.exports = {
  name: 'test',
  execute({ client, args }) {
    // --- RECORD ARGS ---------------------------------------------------
    if (args.length < 1) {
      client.write('chat', {
        message: JSON.stringify({
          text: `\n${prefix} §7Invalid Args.`
        }),
        position: 0
      });
      return;
    };
    const arg = args[0].toLowerCase();
    const subArg = args[1]?.toLowerCase();
    // --- TEST CHAT MESSAGE ---------------------------------------------
    if (arg === 'chat') {
      client.write('chat', {
        message: JSON.stringify({
          text: `\n${prefix}§7Test Chat Message.\n`
        }),
        position: 0
      });
    }
    // --- DISPLAY LOCATION DATA -----------------------------------------
    if (arg === 'location') {
      client.write('chat', {
        message: JSON.stringify({
          text: `\n${prefix}§7Location Data Below:
  §7Server: §6${location.server}
  §7GameType: §6${location.gametype}
  §7Mode: §6${location.mode}
  §7Map: §6${location.map}
  §7LobbyName: §6${location.lobbyname}\n`
        }),
        position: 0
      });
    }
    // --- TOGGLE BOOLEAN OF TEST SETTING --------------------------------
    if (arg === 'settings') {
      writeSettings('test', 'toggle')
      const settings = getSettings()
      client.write('chat', {
        message: JSON.stringify({
          text: `\n${prefix}§7Test Setting set to §6${settings.test}\n`
        }),
        position: 0
      });
    }
    // --- CHANGE XPBAR --------------------------------------------------
    if (arg === 'xpbar') {
      xpBar(client, 'countdown', 3, true, 'random.orb')
    }
    // ---  CLEAR AND DISPLAY INVENTORY CACHE ----------------------------
    if (arg === 'inventory') {
      if (!subArg) {
        client.write('chat', {
          message: JSON.stringify({
            text: `\n${prefix}§7Usage: §6Display§7,§6Clear§7.\n`
          }),
          position: 0
        });
      }
      else if (subArg === 'clear') {
        clearInventoryCache(client)
      }
      else if (subArg === 'display') {
        displayInventory(client)
      }
    }
    // --- GENERATE TEST GUI ---------------------------------------------
    if (arg === 'gui') {
      createGUI(client, 'open', 1, 'test')
    }
    // --- PLAY SOUND EFFECT ---------------------------------------------
    if (arg === 'sound') {
      if (!subArg) {
        playSoundAtPosition(client, 'random.orb')
      }
      else { playSoundAtPosition(client, subArg) }
    }
  }
};