const {verify} = require('jsonwebtoken');
const ApiError = require('./apiError');

require('dotenv').config({path: '.env'});

async function verifyJWT (Utoken) {
    try {

        const token = Utoken.split(' ')[1];
        const payload = await verify(token, process.env.PUBLIC_KEY, {
            expiresIn:  "12h",
            algorithm:  ["RS256"]
        });

        return payload;

    } catch (error) {
        const err = new ApiError().create(401, 'Unauthorized', error.message);
        throw err;
    }
}

module.exports = verifyJWT;