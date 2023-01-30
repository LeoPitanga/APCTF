"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresManagerFactory = void 0;
const Factory_1 = require("./Factory");
const PostgresManager_1 = require("./PostgresManager");
//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
class PostgresManagerFactory extends Factory_1.DatabaseManagerFactory {
    //Factory Method - Retorna objeto do tipo PostgresManager.
    getDatabaseManager() {
        const postgresManager = new PostgresManager_1.PostgresManager();
        postgresManager.initiateDB();
        return postgresManager;
    }
    ;
}
exports.PostgresManagerFactory = PostgresManagerFactory;
