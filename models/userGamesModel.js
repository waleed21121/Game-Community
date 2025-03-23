const mongoose = require('mongoose');

const userGamesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameId: {
        type: Number,
        required: true
    }
});


const userGamesModel = mongoose.model('UserGame', userGamesSchema);

module.exports = userGamesModel;