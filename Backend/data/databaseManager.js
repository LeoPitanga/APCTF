"use strict";
const DB = require('../infra/database');
const postgresManagerFactory = new DB.PostgresManagerFactory();
const postgresManager = postgresManagerFactory.getDatabaseManager();
module.exports = postgresManager;
