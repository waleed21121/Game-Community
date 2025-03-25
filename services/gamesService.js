const axios = require('axios');

require('dotenv').config({path: '.env'});

const CLIENT_ID = process.env.CLIENT_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
async function getAllGames (name, limit = 10, offset = 1) {
    limit = Math.min(limit, 10);
    offset = Math.max(offset, 1);
    offset = (offset - 1) * limit;

    let plainText = `fields id, name, summary; limit ${limit}; offset ${offset};`;
    if(name) {
        plainText += ` search "${name}";`;
    }

    const response = await axios.post(
        'https://api.igdb.com/v4/games',
        plainText,
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
};

async function getGameById (id) {
    const response = await axios.post(
        'https://api.igdb.com/v4/games',
        `fields *; where id = ${id};`,
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
    getAllGames,
    getGameById
}