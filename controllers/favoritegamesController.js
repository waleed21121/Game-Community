const {getQueryObject, addFavoriteGame, isFavoriteGame, removeFavoriteGame} = require('../services/favoriteGamesService');

const {getUserById} = require('../services/userService');

const {getGameById} = require('../services/gamesService');
const ApiFeatures = require('../utils/apiFeatures');

const ApiError = require('../utils/apiError');

async function getUserFavoriteGamesHandler (req, res, next) {
    const user = await getUserById(req.params.id);
    if(!user) {
        const error = new ApiError().create(404, 'Not found', 'User not found');
        throw error;
    }

    req.query.userId = req.params.id;
    const queryObject = getQueryObject();
    const features = new ApiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    let favoriteGames = await features.queryObject;

    if(favoriteGames.length === 0) {
        const error = new ApiError().create(404, 'Not found', 'No favorite games found');
        throw error;
    }

    res.status(200).json({
        status:'success',
        data: {
            favoriteGames
        }
    });
}

async function addUserFavoriteGameHandler (req, res, next) {
    const user = await getUserById(req.user.id);
    if(!user) {
        const error = new ApiError().create(404, 'Not found', 'User not found');
        throw error;
    }

    const { gameId } = req.body;
    const game = await getGameById(gameId);
    if(!game) {
        const error = new ApiError().create(404, 'Not found', 'Game not found');
        throw error;
    }
    
    const existingFavoriteGame = await isFavoriteGame(user.id, gameId);
    if(existingFavoriteGame) {
        const error = new ApiError().create(400, 'Bad request', 'Game is already a favorite');
        throw error;
    }

    const favoriteGame = await addFavoriteGame(user.id, gameId);
    res.status(201).json({
        status:'success',
        data: {
            favoriteGame
        }
    });
}

async function removeUserFavoriteGameHandler (req, res, next) {
    const user = await getUserById(req.user.id);
    if(!user) {
        const error = new ApiError().create(404, 'Not found', 'User not found');
        throw error;
    }
    const { gameId } = req.body;

    const existingFavoriteGame = await isFavoriteGame(user.id, gameId);
    if(!existingFavoriteGame) {
        const error = new ApiError().create(404, 'Not found', 'Game is not a favorite');
        throw error;
    }

    await removeFavoriteGame(user.id, gameId);
    res.status(204).json({
        status:'success',
        message: 'Favorite game removed successfully'
    });
}

module.exports = {
    getUserFavoriteGamesHandler,
    addUserFavoriteGameHandler,
    removeUserFavoriteGameHandler
};