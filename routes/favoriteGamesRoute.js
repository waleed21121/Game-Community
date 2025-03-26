const favoriteGamesRouter = require('express').Router();

const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

const JwtMiddleware = require('../middlewares/JWTMiddleware');

const favoriteGamesController = require('../controllers/favoritegamesController');

const idValidatorMiddleware = require('../middlewares/idValidator');

favoriteGamesRouter.route('/:id').get(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddleware(favoriteGamesController.getUserFavoriteGamesHandler))
    .post(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddleware(favoriteGamesController.addUserFavoriteGameHandler))
    .delete(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddleware(favoriteGamesController.removeUserFavoriteGameHandler));

module.exports = favoriteGamesRouter;
