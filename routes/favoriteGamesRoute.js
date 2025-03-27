const favoriteGamesRouter = require('express').Router();

const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

const JwtMiddleware = require('../middlewares/JWTMiddleware');

const favoriteGamesController = require('../controllers/favoritegamesController');

const idValidatorMiddleware = require('../middlewares/idValidator');

const validationResultMiddleware = require('../middlewares/validationResults');
const favoriteGamesValidators = require('../validators/favoriteGamesValidators');

favoriteGamesRouter.route('/:id').get(JwtMiddleware, validationResultMiddleware, errorHandlerMiddleware(favoriteGamesController.getUserFavoriteGamesHandler))
    .post(JwtMiddleware, idValidatorMiddleware, favoriteGamesValidators, validationResultMiddleware, errorHandlerMiddleware(favoriteGamesController.addUserFavoriteGameHandler))
    .delete(JwtMiddleware, idValidatorMiddleware, favoriteGamesValidators, validationResultMiddleware, errorHandlerMiddleware(favoriteGamesController.removeUserFavoriteGameHandler));

module.exports = favoriteGamesRouter;
