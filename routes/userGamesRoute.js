const userGamesRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const userGamesController = require('../controllers/userGamesController');

userGamesRouter.route('/:id').get(JwtMiddleware, errorHandlerMiddlware(userGamesController.getUserGamesHandler));

userGamesRouter.route('/:id/steam-games').get(JwtMiddleware, errorHandlerMiddlware(userGamesController.getUserSteamGamesHandler))

// TODO: get user specific game all details including review
userGamesRouter.route('/games/:gameId').post(JwtMiddleware, errorHandlerMiddlware(userGamesController.addNewGameHandler))
    .patch(JwtMiddleware, errorHandlerMiddlware(userGamesController.updateGameStatusHandler))
    .delete(JwtMiddleware, errorHandlerMiddlware(userGamesController.deleteUserGameHandler));
module.exports = userGamesRouter;