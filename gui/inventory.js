const log = require('../setup/log.js')

const inventoryCache = new Map();

// ─── CACHE INVENTORY ───────────────────────────────────────────────────
function cacheInventory(client, slots) {
    if (!client || !Array.isArray(slots)) return;
    inventoryCache.set(client, JSON.parse(JSON.stringify(slots)));
    //log.debug('Inventory Cache Set')
}
// ─── LOAD INVENTORY ────────────────────────────────────────────────────
function loadInventory(client) {
    // --- CHECK INVENTORY CACHE -----------------------------------------
    if (!client) return;
    const cached = inventoryCache.get(client);
    if (!cached) {
        log.warn('No inventory saved to cache')
        return;
    }
    // --- WRITE INVENTORY CACHE TO INVENTORY ----------------------------
    client.write('window_items', {
        windowId: 0,
        items: cached
    });
    //log.debug('Inventory Loaded')
}
// ─── CLEAR INVENTORY CACHE ─────────────────────────────────────────────
function clearInventoryCache(client) {
    if (inventoryCache.has(client)) {
        inventoryCache.delete(client);
        log.debug('Inventory Cache Cleared')
    }
}
// ─── DISPLAY INVENTORY IN GUI ──────────────────────────────────────────
function displayInventory(client) {
    // --- CHECK INVENTORY CACHE -----------------------------------------
    const cached = inventoryCache.get(client);
    if (!cached) {
        log.warn('No inventory cached.');
        return;
    }
    // --- GENERATE AIR FOR EMPTY SLOTS ----------------------------------
    const items = Array(54).fill({ blockId: -1 });
    for (let i = 0; i < cached.length && i < 54; i++) {
        items[i] = cached[i];
    }
    // --- OPEN GUI ------------------------------------------------------
    client.write('open_window', {
        windowId: 1,
        inventoryType: 'minecraft:chest',
        windowTitle: JSON.stringify({ text: 'Current Inventory' }),
        slotCount: 54
    });
    // --- SEND INVENTORY CACHE AS ITEMS ----------------------------------
    client.write('window_items', {
        windowId: 1,
        items
    });
    // --- DEBUG MESSAGE (KEEP) ------------------------------------------
    log.debug(`Displayed ${cached.length} cached items in gui`);
}

module.exports = {
    cacheInventory,
    loadInventory,
    clearInventoryCache,
    inventoryCache,
    displayInventory
}