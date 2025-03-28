const rateLimit = require('express-rate-limit');

const ApiError = require('./apiError');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    handler: (req, res, next) => {
        throw new ApiError().create(429, 'Too many requests', 'Too many requests, please try again in 15 minutes');
    }
});

module.exports = limiter;