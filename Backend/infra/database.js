const pgp = require('pg-promise')();
const db = pgp({
	user: 'postgres',
	password: '123321',
	host: 'localhost',
	port: 5432,
	database: 'apctf'
});

module.exports = db;
