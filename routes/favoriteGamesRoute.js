const favoriteGamesRouter = require('express').Router();

const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware');

const JwtMiddleware = require('../middlewares/JWTMiddleware');

const favoriteGamesController = require('../controllers/favoritegamesController');

favoriteGamesRouter.route('/:id').get(JwtMiddleware, errorHandlerMiddleware(favoriteGamesController.getUserFavoriteGamesHandler))
    .post(JwtMiddleware, errorHandlerMiddleware(favoriteGamesController.addUserFavoriteGameHandler))
    .delete(JwtMiddleware, errorHandlerMiddleware(favoriteGamesController.removeUserFavoriteGameHandler));

module.exports = favoriteGamesRouter;
