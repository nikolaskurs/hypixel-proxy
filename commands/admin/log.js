const log = require('../../setup/log.js')

module.exports = {
  name: 'test',
  execute({ client }) {
    const prefix = '§c[§6§lPROXY§r§c] » §7';
    client.write('chat', {
      message: JSON.stringify({ text: `${prefix}Open Terminal` }),
      position: 0
    });
    log.success('Success')
    log.warn('Warning')
    log.error('Error')
    log.info('Info')
    log.message('Message')
  }
};