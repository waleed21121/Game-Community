const {check} = require('express-validator');

const contentChecker = check('content')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Review content must be between 10 and 500 characters');

const ratingChecker = check('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5')
    .toFloat()

const reviewValidators = [contentChecker, ratingChecker];

module.exports = reviewValidators;