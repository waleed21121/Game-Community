const userGamesRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const userGamesController = require('../controllers/userGamesController');

const idValidatorMiddleware = require('../middlewares/idValidator');

userGamesRouter.route('/:id').get(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.getUserGamesHandler))
    .post(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.addNewGameHandler))
    .patch(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.updateGameStatusHandler))
    .delete(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.deleteUserGameHandler));

userGamesRouter.route('/:id/steam-games').get(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.getUserSteamGamesHandler))

module.exports = userGamesRouter;