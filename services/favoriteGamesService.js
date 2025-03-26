const {favoritGamesModel} = require('../models/index');

function getQueryObject() {
    return favoritGamesModel.find();
}

async function addFavoriteGame(userId, gameId) {
    const newFavoriteGame = new favoritGamesModel({userId: userId, gameId: gameId});
    await newFavoriteGame.save();
    return newFavoriteGame;
}

async function removeFavoriteGame(userId, gameId) {
    await favoritGamesModel.deleteOne({userId: userId, gameId: gameId});
    return true;
}

async function isFavoriteGame(userId, gameId) {
    const favoriteGame = await favoritGamesModel.findOne({userId: userId, gameId: gameId});
    return favoriteGame !== null;
}

module.exports = {
    getQueryObject,
    addFavoriteGame,
    removeFavoriteGame,
    isFavoriteGame,
};