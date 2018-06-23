const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET || 'supersecuresecret';

function makeToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            (err, data) => err ? reject(err) : resolve(data)
        )
    });
}



module.exports = {
    makeToken
};