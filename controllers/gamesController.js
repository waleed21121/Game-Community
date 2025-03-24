const gamesServices = require('../services/gamesService');

const {getSteamURL} = require('../utils/getGameSteamURL');
const {getProtonDbSummary} = require('../utils/getGameSummaryPDB');
const {getUserSteamGames, getSteamGameById} = require('../services/steamGamesService');

const {getUserById} = require('../services/userService')

async function getAllGames (req, res, next) {
    const games = await gamesServices.getAllGames(req.query.name, req.query.limit, req.query.page);
    res.status(200).json({
        status: 'success',
        data: {
            games
        }
    });
}

async function getGameById (req, res, next) {
    const games = await gamesServices.getGameById(req.params.id);
    let game = games[0];
    const steamUrl = await getSteamURL(game.websites);
    
    if(steamUrl) {
        game.steamUrl = steamUrl;
        const protnDBGameDetails = await getProtonDbSummary(steamUrl.url);
        game.protnDBGameDetails = protnDBGameDetails;
    }
    
    if (!game) {
        // TODO: handle error
    }
    res.status(200).json({
        status:'success',
        data: {
            game
        }
    });
}

async function getMySteamGames (req, res, next) {
    const games = await getUserSteamGames(req.params.id, req.query.limit, req.query.page);
    res.status(200).json({
        status:'success',
        data: {
            games
        }
    });
}

async function steamGameById (req, res, next) {
    const games = await getSteamGameById(req.params.id);
    res.status(200).json({
        status:'success',
        data: {
            games
        }
    });
}

async function getUserGamesHandler (req, res, next) {
    let games = await gamesServices.getUserGames(req.params.id);
    const user = await getUserById(req.params.id);

    if(user.steamId) {
        const myGames = await getUserSteamGames(user.steamId);
        games.push(...myGames);
    }

    console.log(games);
}

module.exports = {
    getAllGames,
    getGameById,
    getMySteamGames,
    steamGameById,
    getUserGamesHandler
}