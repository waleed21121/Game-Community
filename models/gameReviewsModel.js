const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    gameId:{
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;