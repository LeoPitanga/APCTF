const DB = require('../infra/database');



const postgresManagerFactory = new DB.PostgresManagerFactory();
const postgresManager = postgresManagerFactory.getDatabaseManager('postgres','123321','localhost',5432,'apctf');

module.exports = postgresManager;