const log = require('../../../setup/log.js')
const { loadInventory } = require('./inventory.js')

// ─── CREATE GUI ────────────────────────────────────────────────────────
function createGUI(client, mode, windowId, layout, target = client) {
    if (client.removeGUIListeners) client.removeGUIListeners();
    const gui = require('./gui.js')
    // --- CHECK IF LAYOUT EXISTS ----------------------------------------
    const guiLayout = gui[`${layout}`];
    if (!guiLayout) return log.error('Selected layout not found.')
    // --- FILL MISSING SLOTS WITH AIR -----------------------------------
    const items = Array.from({ length: guiLayout.slotCount }, (_, i) =>
        guiLayout.slots[i]?.item || { blockId: -1, itemCount: 0 }
    );
    if (mode === 'open') {
        // --- OPEN GUI ------------------------------------------------------
        client.write('open_window', {
            windowId,
            inventoryType: guiLayout.type,
            windowTitle: JSON.stringify({ text: guiLayout.title }),
            slotCount: guiLayout.slotCount,
            entityId: 0
        });
        log.invis(`GUI opened: ${windowId}`)
    }
    log.invis(`GUI items resent: ${windowId}`)
    // --- DEFINE SENDITEMS ----------------------------------------------
    const sendItems = () => {
        client.write('window_items', {
            windowId,
            items
        });
        //log.debug(`Sending items from ${layout}`)
    };
    // --- SEND ITEMS FIRST TIME -----------------------------------------
    sendItems()
    // ─── DEFINE READ ONLY GUI ──────────────────────────────────────────
    const readOnlyGUI = (click) => {
        if (click.windowId !== windowId) return;
        // --- RUN FUNCTION OF CLICKED SLOT ------------------------------
        const clickedSlot = guiLayout.slots[click.slot];
        if (clickedSlot && typeof clickedSlot.item?.click === 'function') {
            clickedSlot.item.click({ client, click, target });
            // --- IF A GUI CHANGE HAS OCCURED ---------------------------
            const listenersStillActive = client.listeners('window_click').includes(readOnlyGUI);
            if (!listenersStillActive) {
                client.write('set_slot', {
                    windowId: -1,
                    slot: -1,
                    item: { blockId: -1 }
                });
                loadInventory(client);
                return;
            }
        }
        // --- DENY ALL TRANSACTIONS -------------------------------------
        client.write('transaction', {
            windowId: click.windowId,
            action: click.action,
            accepted: false
        });
        // --- SET CURSOR TO AIR -----------------------------------------
        client.write('set_slot', {
            windowId: -1, // -1 is Cursor or Mouse
            slot: -1,
            item: { blockId: -1 }
        });
        // --- RESEND ITEMS AND RELOAD INVENTORY -------------------------
        // This gives the impression the GUI is read-only
        sendItems();
        loadInventory(client);
    }
    // --- DEFINE CLOSE GUI ----------------------------------------------
    const closeGUI = (close) => {
        if (close.windowId === windowId) {
            client.removeListener('window_click', readOnlyGUI);
            client.removeListener('close_window', closeGUI);
        }
    };
    // --- LISTENERS -----------------------------------------------------
    client.on('window_click', readOnlyGUI); // upon click inside gui, run readOnly
    client.on('close_window', closeGUI); // upon gui close, run closeGUI

    client.removeGUIListeners = () => {
        client.removeListener('window_click', readOnlyGUI);
        client.removeListener('close_window', closeGUI);
    };
}
// ─── CLOSE GUI ─────────────────────────────────────────────────────────
function closeGUI(client, windowId) {
    client.write('close_window', { windowId });
    if (client.removeGUIListeners) client.removeGUIListeners();
    log.invis(`GUI closed: ${windowId}`)
}

module.exports = {
    createGUI,
    closeGUI,
}