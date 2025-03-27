const {validationResult} = require('express-validator');
const ApiError = require('../utils/apiError');
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new ApiError().create(400, 'Bad Request', errors.array().map(err => err.msg));
        return next(error);
    }
    next();
}