const pgp = require('pg-promise')();   //import pg-promise module
const config = require('./dbConfig');   //import the dbConfig

// Connect to the database
const db = pgp(process.env.DATABASE_URL || config);

module.exports = db;
