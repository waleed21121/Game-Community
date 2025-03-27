const {check} = require('express-validator');

const validStatuses = [
    'Currently playing',
    'Played',
    'Plan To Play',
    'Dropped',
    'Completed',
    'On Hold',
    'Multiplayer'
];

const gameIdChecker = check('gameId')
    .isNumeric()
    .withMessage('Game ID must be a number')
    .toInt();

const statusChecker = check('status')
    .isIn(validStatuses)
    .withMessage(`Status must be one of: ${validStatuses.join(', ')}`);

const userGameValidators = [gameIdChecker, statusChecker];

module.exports = userGameValidators;