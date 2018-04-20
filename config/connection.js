const pgp = require('pg-promise')();
const config = require('./dbConfig');

// Connect to the database
const db = pgp(config);

module.exports = db;
