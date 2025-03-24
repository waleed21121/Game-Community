const {getGameWebsites} = require('./getGameWebsites');

async function getSteamURL (urlIds) {
    try {
        const websites = await getGameWebsites(urlIds);
        if(websites.length === 0) {
            return null;
        }
        const steamUrl = websites.find(website => website.url.includes('store.steampowered.com'));
        return steamUrl;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getSteamURL
};