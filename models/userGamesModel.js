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
    },
    gameType: {
        type: String,
        required: true,
        enum: ['Currently playing', 'Played', 'Plan To Play', 'Dropped', 'Completed', 'On Hold', 'Multiplayer']
    }
});


const userGamesModel = mongoose.model('UserGame', userGamesSchema);

module.exports = userGamesModel;