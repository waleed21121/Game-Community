const axios = require('axios');

require('dotenv').config({path: '.env'});

const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
async function getGameWebsites(urlIds) {
    if (!Array.isArray(urlIds) || urlIds.length === 0) {
        return [];
    }
    
    const response = await axios.post(
        'https://api.igdb.com/v4/websites',
        `fields url; where id = (${urlIds.join(',')});`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            },
        }
    );
    return response.data || [];
}

module.exports = {
    getGameWebsites
}