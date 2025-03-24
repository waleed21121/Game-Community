const express = require('express');
const gamesRouter = require('./routes/gamesRoute');
const userRouter = require('./routes/userRoute');
const userGamesRouter = require('./routes/userGamesRoute');

require('dotenv').config({path: '.env'});

const app = express();

app.use(express.json());

app.use('/api/games', gamesRouter)

app.use('/api/users', userRouter);

app.use('/api/user-games', userGamesRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;