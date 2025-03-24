const gamesRouter = require('express').Router();
const gamesController = require('../controllers/gamesController');

const JwtMiddleware = require('../middlewares/JWTMiddleware');
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

gamesRouter.route('/').get(errorHandlerMiddleware(gamesController.getAllGames));

gamesRouter.route('/:id').get(errorHandlerMiddleware(gamesController.getGameById));

gamesRouter.route('/steam/userGames/:id').get(JWTMiddleware, errorHandlerMiddleware(gamesController.getMySteamGames));

gamesRouter.route('/steam/game/:id').get(JWTMiddleware, errorHandlerMiddleware(gamesController.steamGameById));

module.exports = gamesRouter;