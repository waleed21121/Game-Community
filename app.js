const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swageerUI = require('swagger-ui-express');
const gamesRouter = require('./routes/gamesRoute');
const userRouter = require('./routes/userRoute');
const userGamesRouter = require('./routes/userGamesRoute');
const gameReviewsRouter = require('./routes/gameReviewsRoute');
const favoriteGamesRouter = require('./routes/favoriteGamesRoute');

const rateLimitingMiddleware = require('./utils/rateLimiter');

require('dotenv').config({path: '.env'});

const app = express();

app.use(express.json());

// API documentation
const options = require('./swagger/swaggerOptions');
const specs = swaggerJSDoc(options);
app.use('/api-docs', swageerUI.serve, swageerUI.setup(specs));

app.use(rateLimitingMiddleware);

app.use('/api/games', gamesRouter)

app.use('/api/users', userRouter);

app.use('/api/user-games', userGamesRouter);

app.use('/api/game-reviews', gameReviewsRouter);

app.use('/api/favorite-games', favoriteGamesRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode)
    .json({status: error.statusText, error: error.message});
})

module.exports = app;