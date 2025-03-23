const gamesRouter = require('express').Router();
const gamesController = require('../controllers/gamesController');

gamesRouter.route('/').get(gamesController.getAllGames);

gamesRouter.route('/:id').get(gamesController.getGameById);

gamesRouter.route('/steam/userGames/:id').get(gamesController.getMySteamGames);

gamesRouter.route('/steam/game/:id').get(gamesController.steamGameById);

module.exports = gamesRouter;