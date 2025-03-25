const {userGamesModel} = require('../models/index');
function getQueryObject() {
    return userGamesModel.find();
}

async function addNewGame(userId, gameId, status) {
    const newGame = new userGamesModel({userId: userId, gameId: gameId, status: status});
    await newGame.save();
    return newGame;
}

async function updateGameStatus(userId, gameId, status) {
    const updatedGame = await userGamesModel.findOneAndUpdate({userId: userId, gameId: gameId}, {status: status}, {new: true});
    return updatedGame;
}

async function findUserGame (userId, gameId) {
    const userGame = await userGamesModel.findOne({userId: userId, gameId: gameId});
    return userGame;
}

async function deleteUserGame (userId, gameId) {
    await userGamesModel.deleteOne({userId: userId, gameId: gameId});
    return true;
}

module.exports = {
    getQueryObject,
    addNewGame,
    updateGameStatus,
    findUserGame,
    deleteUserGame
}