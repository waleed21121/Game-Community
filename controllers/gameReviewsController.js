const {getQueryObject, addNewReview, updateGameReview, deleteGameReview, getReviewById} = require('../services/gameReviewsService');
const {getGameById} = require('../services/gamesService');

const ApiFeatures = require('../utils/apiFeatures');

const ApiError = require('../utils/apiError');

async function getGameReviewsHandler (req, res, next) {
    req.query.gameId = req.params.gameId;
    req.query.sort = 'createdAt';

    const queryObject = getQueryObject();

    const features = new ApiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    
    let reviews = await features.queryObject;

    if(reviews.length === 0) {
        const error = new ApiError().create(404, 'Not found', 'No reviews found');
        throw error;
    }

    res.status(200).json({
        status:'success',
        data: reviews
    });
}

async function postGameReviewHandler (req, res, next) {
    
    const gameId = req.params.gameId;
    
    const game = await getGameById(gameId);
    
    if(!game) {
        const error = new ApiError().create(404, 'Not found', 'Game not found');
        throw error;
    }

    const userId = req.user.id;
    const {content, rating} = req.body;

    const newReview = {gameId, userId, content, rating};
    const createdReview = await addNewReview(newReview);

    res.status(201).json({
        status:'success',
        data: createdReview
    });
}

async function updateGameReviewHandler (req, res, next) {
    const reviewId = req.params.reviewId;

    const review = await getReviewById(reviewId);
    
    if(!review) {
        const error = new ApiError().create(404, 'Not found', 'Review not found');
        throw error;
    }

    const userId = req.user.id;
    const gameId = req.params.gameId;
    
    if(review.userId.toString() !== userId.toString() || review.gameId.toString() !== gameId.toString()) {
        const error = new ApiError().create(403, 'Forbidden', 'You are not authorized to update this review');
        throw error;
    }
    
    const {rating, content} = req.body;
    const newReview = {rating, content, createdAt: Date.now()};

    const updatedReview = await updateGameReview(reviewId, newReview);

    res.status(200).json({
        status:'success',
        data: updatedReview
    });
}

async function deleteGameReviewHandler (req, res, next) {
    const reviewId = req.params.reviewId;
    const review = await getReviewById(reviewId);
    if(!review) {
        const error = new ApiError().create(404, 'Not found', 'Review not found');
        throw error;
    }
    const userId = req.user.id;
    const gameId = req.params.gameId;
    if(review.userId.toString()!== userId.toString() || review.gameId.toString()!== gameId.toString()) {
        const error = new ApiError().create(403, 'Forbidden', 'You are not authorized to delete this review');
        throw error;
    }

    await deleteGameReview(reviewId);
    res.status(204).json({
        status:'success',
        data: null
    });
}

module.exports = {
    getGameReviewsHandler,
    postGameReviewHandler,
    updateGameReviewHandler,
    deleteGameReviewHandler
};