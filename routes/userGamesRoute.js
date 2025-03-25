const userGamesRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const userGamesController = require('../controllers/userGamesController');

userGamesRouter.route('/:id').get(JwtMiddleware, errorHandlerMiddlware(userGamesController.getUserGamesHandler));

userGamesRouter.route('/:id/steam-games').get(JwtMiddleware, errorHandlerMiddlware(userGamesController.getUserSteamGamesHandler))

module.exports = userGamesRouter;