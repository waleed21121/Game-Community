const {sign} = require('jsonwebtoken');
require('dotenv').config({path: '.env'});

async function JWTIssuer (payload) {
    const token = await sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: '12h',
        algorithm: "RS256"
    });
    return token;
}

module.exports = JWTIssuer;