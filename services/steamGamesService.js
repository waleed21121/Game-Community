const axios = require('axios');

require('dotenv').config({path: '.env'});

const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function getUserSteamGames (steamId, limit = 25, page = 1) {
    const response = await axios.get(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`,
        {
            params: {
                key: STEAM_API_KEY,
                steamid: steamId,
                include_appinfo: 1,
                include_played_free_games: 1,
                format: 'json',
            },
        }
    );

    limit = Math.min(limit, 25);
    page = Math.max(page, 1);
    let offset = (page - 1) * limit;
    const games = response.data.response.games;
    const paginatedGames = games.slice(offset, offset + limit);
    return paginatedGames;
}

async function getSteamGameById(appId) {

    const response = await axios.get(`https://store.steampowered.com/api/appdetails`, {
        params: {
            appids: appId,
            format: 'json', 
        }
    });
    const game = response.data[appId].data;
    return {
        appId: appId,
        name: game.name,
        required_age: game.required_age,
        is_free: game.is_free,
        detailed_description: game.detailed_description,
        about_the_game: game.about_the_game,
        short_description: game.short_description,
        supported_languages: game.supported_languages,
        header_image: game.header_image,
        genres: game.genres,
        capsule_image: game.capsule_image,
        capsule_imagev5: game.capsule_imagev5,
        categories: game.categories,
        screenshots: game.screenshots,
        release_date: game.release_date,
        background: game.background
    };
}
module.exports = {
    getUserSteamGames,
    getSteamGameById
}