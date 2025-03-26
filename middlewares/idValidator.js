const ObjectId = require('mongoose').Types.ObjectId;
const ApiError = require('../utils/apiError');

module.exports = 
    (req, res, next) => {
        const id = req.params.id || req.params.reviewId;
        if (!ObjectId.isValid(id)) {
            const error = new ApiError().create(400, 'Invalid', 'Invalid id');
            return next(error);
        }
        next();        
    }