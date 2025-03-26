const {gameReviwesModel} = require('../models/index');
function getQueryObject () {
    return gameReviwesModel.find();
}

async function getReviewById (id) {
    const review = await gameReviwesModel.findById(id);
    return review;
}
async function addNewReview(review) {
    const newReview = new gameReviwesModel(review);
    await newReview.save();
    return newReview;
}

async function updateGameReview (reviewId, review) {
    const updatedReview = await gameReviwesModel.findByIdAndUpdate(reviewId, review, {new: true});
    return updatedReview;
}

async function deleteGameReview (reviewId) {
    await gameReviwesModel.findByIdAndDelete(reviewId);
}

module.exports = {
    getQueryObject,
    addNewReview,
    updateGameReview,
    deleteGameReview,
    getReviewById
};