const gameReviewsRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const gameReviewsController = require('../controllers/gameReviewsController');

gameReviewsRouter.route('/:gameId').get(JwtMiddleware, errorHandlerMiddlware(gameReviewsController.getGameReviewsHandler))
    .post(JwtMiddleware, errorHandlerMiddlware(gameReviewsController.postGameReviewHandler));

gameReviewsRouter.route('/:gameId/:reviewId').patch(JwtMiddleware, errorHandlerMiddlware(gameReviewsController.updateGameReviewHandler))
    .delete(JwtMiddleware, errorHandlerMiddlware(gameReviewsController.deleteGameReviewHandler));

module.exports = gameReviewsRouter;