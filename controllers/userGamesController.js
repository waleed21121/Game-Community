const {getUserById} = require('../services/userService');
const {getQueryObject} = require('../services/userGamesService');

const {getUserSteamGames} = require('../services/steamGamesService');

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


module.exports = {
    getUserGamesHandler,
    getUserSteamGamesHandler
};