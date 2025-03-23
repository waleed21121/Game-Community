const express = require('express');
const gamesRouter = require('./routes/gamesRoute');
require('dotenv').config({path: '.env'});

const app = express();

app.use(express.json());

app.use('/api/games', gamesRouter)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;