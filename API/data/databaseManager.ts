const DB = require('../infra/database');



const postgresManagerFactory = new DB.PostgresManagerFactory();
const postgresManager: PostgresManager = postgresManagerFactory.getDatabaseManager();

module.exports = postgresManager;