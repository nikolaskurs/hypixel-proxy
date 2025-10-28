const log = require('../../setup/log.js')
const prefix = require('../../setup/prefix.js')

module.exports = {
  name: 'log',
  execute({ client }) {
    client.write('chat', {
      message: JSON.stringify({ text: `${prefix}Open Terminal` }),
      position: 0
    });
    log.success('Success')
    log.warn('Warning')
    log.error('Error')
    log.info('Info')
    log.message('Message')
    log.debug('Debug')
  }
};