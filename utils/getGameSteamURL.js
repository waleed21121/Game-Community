const {getGameWebsites} = require('./getGameWebsites');

async function getSteamURL (urlIds) {
    const websites = await getGameWebsites(urlIds);
    
    const steamUrl = websites.find(website => website.url.includes('store.steampowered.com'));
    
    return steamUrl;
}

module.exports = {
    getSteamURL
};