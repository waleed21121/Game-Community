const {check} = require('express-validator');

const gameIdChecker = check('gameId')
    .isNumeric()
    .withMessage('Game ID must be a number')
    .toInt();

const favoriteGamesValidators = [gameIdChecker];

module.exports = favoriteGamesValidators;