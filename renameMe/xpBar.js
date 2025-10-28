let isCooldownActive = false;
const { location } = require('../location/parseLocraw.js')
const { playSoundAtPosition } = require('./sound.js')

async function xpBar(client, action, durationSeconds, showLevel, sound) {
    if (action === 'countdown') {
        const startingServer = location.server;
        const updateInterval = 100;
        const totalTicks = (durationSeconds * 1000) / updateInterval;

        let tick = 0;
        let lastLevel = durationSeconds;

        isCooldownActive = true;

        client.write('experience', {
            experienceBar: 1.0,
            level: showLevel ? durationSeconds : 0,
            totalExperience: 0
        });

        const interval = setInterval(() => {
            if (location.server !== startingServer) {
                client.write('experience', {
                    experienceBar: 1.0,
                    level: 67, // Add feature to revert back to last known value, perhaps if location.server has "dynamiclobby" it will fetch users network level from api.
                    totalExperience: 0
                });
                clearInterval(interval);
                isCooldownActive = false;
                return;
            }

            const barProgress = Math.max(1 - tick / totalTicks, 0);

            const secondsRemaining = Math.ceil(durationSeconds - (tick * updateInterval) / 1000);

            if (secondsRemaining !== lastLevel && secondsRemaining >= 0) {
                client.write('experience', {
                    experienceBar: barProgress,
                    level: showLevel ? secondsRemaining : 0,
                    totalExperience: 0
                });
                lastLevel = secondsRemaining;
            } else {
                client.write('experience', {
                    experienceBar: barProgress,
                    level: showLevel ? lastLevel : 0,
                    totalExperience: 0
                });
            }

            tick++;

            if (tick > totalTicks) {
                if (sound) playSoundAtPosition(client, sound);
                clearInterval(interval);
                isCooldownActive = false;
            }
        }, updateInterval);
    }
}

module.exports = {
    xpBar
};

// add cache for xpbar values blah blah blah
