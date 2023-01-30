import {DatabaseManagerFactory} from "./Factory";
import {PostgresManager} from "./PostgresManager";
//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
export class PostgresManagerFactory extends DatabaseManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager():PostgresManager{
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB();
		return postgresManager;
	};
}