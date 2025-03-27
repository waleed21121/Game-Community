const gameReviewsRouter = require('express').Router();

const errorHandlerMiddlware = require('../middlewares/errorHandlerMiddleware');
const JwtMiddleware = require('../middlewares/JWTMiddleware');

const gameReviewsController = require('../controllers/gameReviewsController');

const idValidatorMiddleware = require('../middlewares/idValidator');

const validationResultMiddleware = require('../middlewares/validationResults');
const gameReviewValidator = require('../validators/gameReviewsValidators');

gameReviewsRouter.route('/:gameId').get(JwtMiddleware, errorHandlerMiddlware(gameReviewsController.getGameReviewsHandler))
    .post(JwtMiddleware, gameReviewValidator, validationResultMiddleware, errorHandlerMiddlware(gameReviewsController.postGameReviewHandler));

gameReviewsRouter.route('/:gameId/:reviewId').patch(JwtMiddleware, idValidatorMiddleware, gameReviewValidator, validationResultMiddleware, errorHandlerMiddlware(gameReviewsController.updateGameReviewHandler))
    .delete(JwtMiddleware, idValidatorMiddleware, errorHandlerMiddlware(gameReviewsController.deleteGameReviewHandler));

module.exports = gameReviewsRouter;