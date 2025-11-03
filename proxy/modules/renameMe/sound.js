const log = require('../../../setup/log.js')

function playSoundAtPosition(client, soundName) {
  return new Promise((resolve, reject) => {
    client.once('position', (data) => {
      if (!data || typeof soundName !== 'string') {
        reject(log.warn('Invalid Sound or Position'));
        return;
      }
      client.write('named_sound_effect', {
        soundName,
        soundCategory: 0,
        x: data.x * 8,
        y: data.y * 8,
        z: data.z * 8,
        volume: 1.0,
        pitch: 2.0
      });
      resolve();
      log.invis(`Sound (${soundName}) played`)
    });
  });
}

module.exports = {playSoundAtPosition}