const axios = require('axios');

async function getProtonDbSummary(steamUrl) {
    const appIdMatch = steamUrl.match(/app\/(\d+)/);
    if (!appIdMatch || !appIdMatch[1]) {
        // TODO: handle error
        return;
    }
    const steamAppId = appIdMatch[1];
    const response = await axios.get(`https://protondb-community-api-04f42bc1742f.herokuapp.com/api/games/${steamAppId}/summary`)
    return response.data;
}

module.exports = { getProtonDbSummary };