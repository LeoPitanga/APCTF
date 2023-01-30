"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresFactory_1 = require("./PostgresFactory");
const pgManagerFactory = new PostgresFactory_1.PostgresManagerFactory();
const pgManager = pgManagerFactory.getDatabaseManager();
module.exports = pgManager;
