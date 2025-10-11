const chalkColours = require('./colours');

function flattenJSON(json) {
    if (typeof json === 'string') return json;
    let result = '';

    if (json.text) result += json.text;

    if (json.extra && Array.isArray(json.extra)) {
        for (const part of json.extra) {
            result += flattenJSON(part);
        }
    }

    return result;
}

function formatMCChat(json) {
    if (!json) return '';

    const plainText = flattenJSON(json);

    if (plainText.startsWith('{') && plainText.includes('"server":')) { //ignore auto /locraw responses from lunar client
        return '';
    }

    if (plainText.includes('§')) { //parse mc colour codes 
        const parts = plainText.split(/(§.)/gi); 
        let currentStyle = chalkColours['r'];
        let formatted = '';

        for (const part of parts) {
            if (!part) continue;

            const codeMatch = part.match(/^§([0-9a-f])/i);
            if (codeMatch) {
                const code = codeMatch[1].toLowerCase();
                if (chalkColours[code]) currentStyle = chalkColours[code];
            } else if (part.match(/^§r/i)) {
                currentStyle = chalkColours['r'];
            } else if (!part.match(/^§[lornm]/i)) {
                formatted += currentStyle(part);
            }
        }
        return formatted;
    }

    let result = '';

    if (json.text) { //parse server json messages text: color:
        let styledText = json.text.replace(/§[lornm]/gi, '');
        if (json.color) {
            let colorKey = json.color.replace(/ /g, '_').toUpperCase();
            if (colorKey === 'GREEN') colorKey = 'LIGHT_GREEN';
            if (colorKey === 'DARK_AQUA') colorKey = 'CYAN';
            if (chalkColours[colorKey]) styledText = chalkColours[colorKey](styledText);
        }
        result += styledText;
    }

    if (json.extra && Array.isArray(json.extra)) { //parse server json messages extra: text: color:
        function processExtra(extraArray) {
            for (const part of extraArray) {
                if (!part.text) continue;

                let styledText = part.text.replace(/§[lornm]/gi, '');
                if (part.color) {
                    let colorKey = part.color.replace(/ /g, '_').toUpperCase();
                    if (colorKey === 'GREEN') colorKey = 'LIGHT_GREEN';
                    if (chalkColours[colorKey]) styledText = chalkColours[colorKey](styledText);
                }

                result += styledText;

                if (Array.isArray(part.extra)) {
                    processExtra(part.extra);
                }
            }
        }
        processExtra(json.extra);
    }

    return result;
}

module.exports = { flattenJSON, formatMCChat }

// known issues - parent formatting doesnt extend to child