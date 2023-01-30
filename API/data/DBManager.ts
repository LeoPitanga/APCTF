import { PostgresManagerFactory } from "./PostgresFactory";



const pgManagerFactory = new PostgresManagerFactory();
const pgManager = pgManagerFactory.getDatabaseManager();

module.exports = pgManager;