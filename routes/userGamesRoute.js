const userGamesRouter = require('express').Router();

const gamesController = require('../controllers/gamesController');

userGamesRouter.route('/:id').get(gamesController.getUserGamesHandler);

module.exports = userGamesRouter;