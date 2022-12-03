const pgp = require('pg-promise')();


/*Prezados Professores, 

Descobri a pouco que a linguagem Javascript não possui todos os recursos necessários para representar corretamente o padrão Factory Method (classes abstratas e interfaces). (tive que aprender a programar para Web a partir do zero nesta UC. Tem sido um grande desafio, mas estou a chegar lá!)

Diante do prazo de entrega do módulo 4 (amanhã - 04/12/2022), manterei o código em Javascript com os devidos comentários para representar a abstração necessária ao padrão de criação Factory Method. 
No entanto, pretendo migrar o projeto inteiro para Typescript nos próximos módulos. Isto permitirá, através de uma linguagem mais apropriada, a correta representação dos Design Patterns.

Adicionalmente, como ainda não implementei a lógica necessária para armazenar/obter as analytics no banco de dados, os métodos referentes a essas ações serão omitidos, por enquanto.

*/


//Database Factory - Seria uma Abstract Class, caso o Javascript permitisse.
class DatabaseManagerFactory {
	//Factory Method - Retornaria objeto do tipo DatabaseManager, se o Javascript permitisse declarar o retorno do método.
	getDatabaseManager(user1, password1, host1, port1, database1){};
}


//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
class PostgresManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager(user1, password1, host1, port1, database1){
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB(user1, password1, host1, port1, database1);
		return postgresManager;
	};
}


//Abstract Product - Seria uma Interface, caso o Javascript permitisse.
class DatabaseManager {
	/* 
	initiateDB(){
		return this.connectDB();
	} */
	dtbase;

	initiateDB(user1, password1, host1, port1, database1){};
	saveActivity (activity) {};
	saveStudent (activityStudent) {};
	updateActivity (activityID, activityStudent) {};
}

//Concrete Product - Implementaria a Interface DatabaseManager, caso o javascript permitisse.
class PostgresManager extends DatabaseManager {
	initiateDB(user1, password1, host1, port1, database1){
		const db = pgp({
			user: user1,
			password: password1,
			host: host1,
			port: port1,
			database: database1
		});
		super.dtbase = db;
	}

	saveActivity (activity) {
		return this.dtbase.none('insert into apctf.activities(activity_id) values ($1)', [activity.activityID]);
	};

	saveStudent (activityStudent) {
		return this.dtbase.none('insert into apctf.students(invenira_std_id,activity_id_fk) values ($1,$2)', [activityStudent.InveniRAstdID,activityStudent.activityID]);
	};

	updateActivity (activityID, activityStudent) {
		return this.dtbase.none('update apctf.activities set instrucoesacesso = $1, instrucoesobjetivo = $2, act_flag = $3, dica1 = $4, dica2 = $5, dica3 = $6 where activity_id = $7', [activityStudent.json_params.instrucoesacesso, activityStudent.json_params.instrucoesobjetivo, activityStudent.json_params.flag, activityStudent.json_params.dica1, activityStudent.json_params.dica2, activityStudent.json_params.dica3, activityID]);
	};

	deleteActivity (id) {
		return this.dtbase.none('delete from apctf.activities where activity_id = $1', [id]);
	};
}

module.exports = {
	DatabaseManagerFactory,
	PostgresManagerFactory,
	DatabaseManager,
	PostgresManager
}