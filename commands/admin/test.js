module.exports = {
  name: 'test',
  execute({ client }) {
    const prefix = '§c[§6§lPROXY§r§c] » §7';
    client.write('chat', {
      message: JSON.stringify({ text: `${prefix}test` }),
      position: 0
    });
  }
};