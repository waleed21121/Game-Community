const {verify} = require('jsonwebtoken');

require('dotenv').config({path: '.env'});

async function verifyJWT (Utoken) {
    const token = Utoken.split(' ')[1];
    const payload = await verify(token, process.env.PUBLIC_KEY, {
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    });
    return payload;
}

module.exports = verifyJWT;