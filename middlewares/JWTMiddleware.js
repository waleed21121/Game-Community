const verifyToken = require('../utils/verifyToken');

async function handler (req, res, next) {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token) {
        // TODO: handle error
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    const payload = await verifyToken(token);
    req.user = payload;
    next();
}

module.exports = handler;