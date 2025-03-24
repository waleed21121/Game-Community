const verifyToken = require('../utils/verifyToken');
const ApiError = require('../utils/apiError');
async function handler (req, res, next) {
    try {
        const token = req.headers.authorization || req.headers.Authorization;
        if (!token) {
            const error = new ApiError().create(401, 'Unauthorized', 'Token is required');
            next(error);
        }
        const payload = await verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = handler;