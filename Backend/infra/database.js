const pgp = require('pg-promise')();
const db = pgp({
	user: 'fnnaebagxvrvug',
	password: '2469ae22141e2b2c69aa17ea9490b5fd011b5c8f1f6a73011b9413662351922c',
	host: 'ec2-34-247-72-29.eu-west-1.compute.amazonaws.com',
	port: 5432,
	database: 'dbr9j78atsvn3f'
});

module.exports = db;
