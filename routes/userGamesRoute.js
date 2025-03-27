const userGamesRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const userGamesController = require('../controllers/userGamesController');

const idValidatorMiddleware = require('../middlewares/idValidator');

const validationResultMiddleware = require('../middlewares/validationResults');
const userGameValidators = require('../validators/userGamesValidators');

userGamesRouter.route('/:id').get(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.getUserGamesHandler))
    .post(JwtMiddleware, idValidatorMiddleware, userGameValidators, validationResultMiddleware, errorHandlerMiddlware(userGamesController.addNewGameHandler))
    .patch(JwtMiddleware, idValidatorMiddleware, userGameValidators, validationResultMiddleware, errorHandlerMiddlware(userGamesController.updateGameStatusHandler))
    .delete(JwtMiddleware, idValidatorMiddleware, userGameValidators, validationResultMiddleware, errorHandlerMiddlware(userGamesController.deleteUserGameHandler));

userGamesRouter.route('/:id/steam-games').get(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(userGamesController.getUserSteamGamesHandler))

module.exports = userGamesRouter;