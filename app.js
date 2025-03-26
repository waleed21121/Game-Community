const express = require('express');
const gamesRouter = require('./routes/gamesRoute');
const userRouter = require('./routes/userRoute');
const userGamesRouter = require('./routes/userGamesRoute');
const gameReviewsRouter = require('./routes/gameReviewsRoute');

require('dotenv').config({path: '.env'});

const app = express();

app.use(express.json());

app.use('/api/games', gamesRouter)

app.use('/api/users', userRouter);

app.use('/api/user-games', userGamesRouter);

app.use('/api/game-reviews', gameReviewsRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode)
    .json({status: error.statusText, error: error.message});
})

module.exports = app;