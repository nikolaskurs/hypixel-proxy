module.exports = {
    name: 'ap',
    execute({ target }) {
        target.write('chat', {
            message: `/achievements`
        });
    }
}

// CHANGE L8R TO WORK WITH OTHER PLAYERS