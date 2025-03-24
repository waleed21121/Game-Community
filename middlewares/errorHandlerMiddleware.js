const ApiError = require('../utils/apiError');

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            if (err instanceof ApiError) {
                next(err);
            } else {
                const error = new ApiError().create(500, 'Fail', 'Internal Server Error')
                next(error);
            }
        });
    }
}
