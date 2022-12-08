const pgp = require('pg-promise')();
console.log(process.env.POSTGRES_URI);
const PGCONNECTION_URI = process.env.POSTGRES_URI || 'postgres://postgres:123321@localhost:5432/apctf';

const mongoose = require('mongoose');
const MGDBCONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/apctf';

mongoose.Promise = global.Promise;
mongoose.set('debug',true);



/*Prezados Professores, 

Descobri a pouco que a linguagem Javascript não possui todos os recursos necessários para representar corretamente o padrão Factory Method (classes abstratas e interfaces). (tive que aprender a programar para Web a partir do zero nesta UC. Tem sido um grande desafio, mas estou a chegar lá!)

Diante do prazo de entrega do módulo 4 (amanhã - 04/12/2022), manterei o código em Javascript com os devidos comentários para representar a abstração necessária ao padrão de criação Factory Method. 
No entanto, se for possível dentro do tempo disponível, pretendo tentar migrar o projeto inteiro para Typescript nos próximos módulos. Isto permitirá a correta representação dos Design Patterns.

*/


//Database Factory - Seria uma Abstract Class, caso o Javascript permitisse.
class DatabaseManagerFactory {
	//Factory Method - Retornaria objeto do tipo DatabaseManager, se o Javascript permitisse declarar o retorno do método.
	getDatabaseManager(){};
}


//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
class PostgresManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager(){
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB();
		return postgresManager;
	};
}

//MongoDB Factory - Concrete Class - herda de DatabaseManagerFactory.
class MongoDBManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager(){
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB();
		return postgresManager;
	};
}


//Abstract Product - Seria uma Interface, caso o Javascript permitisse.
class DatabaseManager {

	initiateDB(){};
	saveActivity (activity) {};
	getActivityDetails (activity) {};
	saveStudent (activityStudent) {};
	getStudent (activityStudent) {};
	updateActivity (activityID, activityStudent) {};
	getAnalytics(activityID){};
	saveAnalytics(analytics){};
}

//Concrete Product - Implementaria a Interface DatabaseManager, caso o javascript permitisse.
class PostgresManager extends DatabaseManager {
	
	dtbase;

	initiateDB(){
		const db = pgp(PGCONNECTION_URI);
		this.dtbase = db;
	}

	saveActivity (activity) {
		return this.dtbase.none('insert into apctf.activities(activity_id) values ($1)', [activity.activityID]);
	};

	getActivityDetails (activityID) {
		return this.dtbase.oneOrNone('select * from apctf.activities where activity_id = $1', [activityID]);
	};

	saveStudent (activityStudent) {
		return this.dtbase.none('insert into apctf.students(invenira_std_id,activity_id_fk) values ($1,$2)', [activityStudent.InveniRAstdID,activityStudent.activityID]);
	};

	getStudent (activityStudent) {
		return this.dtbase.oneOrNone('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where invenira_std_id = $1 and activity_id_fk = $2', [activityStudent.InveniRAstdID,activityStudent.activityID]);
	};

	updateActivity (activityID, activityStudent) {
		return this.dtbase.none('update apctf.activities set instrucoesacesso = $1, instrucoesobjetivo = $2, act_flag = $3, dica1 = $4, dica2 = $5, dica3 = $6 where activity_id = $7', [activityStudent.json_params.instrucoesacesso, activityStudent.json_params.instrucoesobjetivo, activityStudent.json_params.flag, activityStudent.json_params.dica1, activityStudent.json_params.dica2, activityStudent.json_params.dica3, activityID]);
	};

	deleteActivity (activityID) {
		return this.dtbase.none('delete from apctf.activities where activity_id = $1', [activityID]);
	};

	getAnalytics(activityID){
		return this.dtbase.query('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where activity_id_fk = $1', [activityID]);
	};

	saveAnalytics(analytics){
		return this.dtbase.none('update apctf.students set acessoatividade = $1, acessoinstrucoes = $2, acessoobjetivo = $3, acertouflag = $4, acessodica1 = $5, acessodica2 = $6, acessodica3 = $7 where invenira_std_id = $8 and activity_id_fk = $9', [analytics.json_params.acessoatividade, analytics.json_params.acessoinstrucoes, analytics.json_params.acessoobjetivo, analytics.json_params.acertouflag, analytics.json_params.acessodica1, analytics.json_params.acessodica2, analytics.json_params.acessodica3, analytics.InveniRAstdID, analytics.activityID]);
	};
}


class MongoDBManager extends DatabaseManager {
	
	dtbase;

	initiateDB(){
		mongoose.connect(MGDBCONNECTION_URI, {
			useMongoClient: true
		})
		.catch(err => console.log(err));
		this.dtbase = mongoose;
	}

	saveActivity (activity) {
		//Desenvolver se necessário
	};

	getActivityDetails (activityID) {
		//Desenvolver se necessário
	};

	saveStudent (activityStudent) {
		//Desenvolver se necessário
	};

	getStudent (activityStudent) {
		//Desenvolver se necessário
	};

	updateActivity (activityID, activityStudent) {
		//Desenvolver se necessário
	};

	deleteActivity (activityID) {
		//Desenvolver se necessário
	};

	getAnalytics(activityID){
		//Desenvolver se necessário
	};

	saveAnalytics(analytics){
		//Desenvolver se necessário
	};
}

module.exports = {
	DatabaseManagerFactory,
	PostgresManagerFactory,
	MongoDBManagerFactory,
	DatabaseManager,
	PostgresManager,
	MongoDBManager
}