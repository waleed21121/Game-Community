const axios = require('axios');
require('dotenv').config({path: '.env'});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function getAccessToken() {    
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error.message);
    }
};


module.exports = {
    getAccessToken
}