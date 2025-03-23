const mongoose = require('mongoose');

const favoritGamesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    gameId: {
        type: Number,
        required: true
    }
});

const favoritGamesModel = mongoose.model('favoritGame', favoritGamesSchema);

module.exports = favoritGamesModel;