const {getUserById} = require('../services/userService');
const {getQueryObject, addNewGame, updateGameStatus, findUserGame, deleteUserGame} = require('../services/userGamesService');

const {getUserSteamGames} = require('../services/steamGamesService');

const {getGameById} = require('../services/gamesService')

const ApiFeatures = require('../utils/apiFeatures');

const ApiError = require('../utils/apiError');
async function getUserGamesHandler (req, res, next) {
    req.query.userId = req.params.id;

    const queryObject = getQueryObject();
    const features = new ApiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    
    let games = await features.queryObject;

    if(games.length === 0) {
        const error = new ApiError().create(404, 'Not found', 'No games found');
        throw error;
    }

    res.status(200).json({
        status:'success',
        data: {
            games
        }
    });
}

async function getUserSteamGamesHandler (req, res, next) {
    const user = await getUserById(req.params.id);
    
    if(!user) {
        const error = new ApiError().create(404, 'Not found', 'User not found');
        throw error;
    }

    if(!user.steamId) {
        const error = new ApiError().create(400, 'Bad request', 'User does not have a Steam ID');
        throw error;
    }

    const games = await getUserSteamGames(user.steamId, req.query.limit, req.query.page);

    if(games.length === 0) {
        const error = new ApiError().create(404, 'Not found', 'No games found');
        throw error;
    }

    res.status(200).json({
        status:'success',
        data: {
            games
        }
    });
}

async function addNewGameHandler(req, res, next) {
    const gameId = req.body.gameId;
    const game = await getGameById(gameId);
    if(!game) {
        const error = new ApiError().create(404, 'Not found', 'Game not found');
        throw error;
    }

    const user = await getUserById(req.user.id);
    if(!user) {
        const error = new ApiError().create(404, 'Not found', 'User not found');
        throw error;
    }

    const usergame = await findUserGame(req.user.id, gameId);

    let newGame;

    if(usergame) {
        newGame = await updateGameStatus(req.user.id, gameId, req.body.status);
    } else {
        newGame = await addNewGame(req.user.id, gameId, req.body.status);
    }

    res.status(201).json({
        status:'success',
        data: {
            newGame
        }
    });

}

async function updateGameStatusHandler (req, res, next) {
    const gameId = req.body.gameId;
    const usergame = await findUserGame(req.user.id, gameId);
    if(!usergame) {
        const error = new ApiError().create(404, 'Not found', 'User game not found');
        throw error;
    }
    const updatedGame = await updateGameStatus(req.user.id, gameId, req.body.status);
    res.status(200).json({
        status:'success',
        data: {
            updatedGame
        }
    })
}

async function deleteUserGameHandler (req, res, next) {
    const gameId = req.body.gameId;
    const usergame = await findUserGame(req.user.id, gameId);
    if(!usergame) {
        const error = new ApiError().create(404, 'Not found', 'User game not found');
        throw error;
    }
    await deleteUserGame(req.user.id, gameId);

    res.status(204).json({
        status:'success',
        data: null
    })
}

module.exports = {
    getUserGamesHandler,
    getUserSteamGamesHandler,
    addNewGameHandler,
    updateGameStatusHandler,
    deleteUserGameHandler
};