const db = require('../config/connection');  //import the connection
//define the functions that query the database

const bcrypt = require('bcrypt');
const salt = 7;


function register(userData) {
    return bcrypt.hash(userData.password, salt)
        .then(hash => {
            const newUser = {
                username: userData.username,
                email: userData.email,
                pw_digest: hash
            }
            return db.one(`
        INSERT INTO users (username, email, pw_digest)
        VALUES ($/username/, $/email/, $/pw_digest/)
        RETURNING id, username, email
      `, newUser)
        })
}

function getEmail(email) {
    return db.one(`
    SELECT * FROM users
    WHERE email = $1
  `, email);
}

function sign_in(userData) {
    return getEmail(userData.email)
        .then(user =>
            bcrypt.compare(userData.password, user.pw_digest)
                .then(match => {
                    if (!match) throw new Error('UserData does not match');
                    delete user.pw_digest;
                    return user;
                })
        )
}


module.exports = {
    register,
    sign_in
}