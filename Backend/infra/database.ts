const pgp = require('pg-promise')();
const PGCONNECTION_URI = process.env.POSTGRES_URI || 'postgres://postgres:123321@localhost:5432/apctf';

const mongoose = require('mongoose');
const MGDBCONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/apctf';

mongoose.Promise = global.Promise;
mongoose.set('debug',true);


//Database Factory
abstract class DatabaseManagerFactory {
	//Factory Method - Retornaria objeto do tipo DatabaseManager, se o Javascript permitisse declarar o retorno do método.
	getDatabaseManager(){};
}


//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
class PostgresManagerFactory extends DatabaseManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager(){
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB();
		return postgresManager;
	};
}

//MongoDB Factory - Concrete Class - herda de DatabaseManagerFactory.
class MongoDBManagerFactory extends DatabaseManagerFactory {
	//Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
	getDatabaseManager(){
		const postgresManager = new PostgresManager();
		postgresManager.initiateDB();
		return postgresManager;
	};
}


//Abstract Product - Interface.
interface DatabaseManager {

	initiateDB():any;
	saveActivity (activity: any): any;
	getActivityDetails (activity: any): any;
	saveStudent (activityStudent: any): any;
	getStudent (activityStudent: any): any;
	updateActivity (activityID: any, activityStudent: any): any;
	getAnalytics(activityID: any): any;
	saveAnalytics(analytics: any): any;
}

//Concrete Product Postgres - Implementa a Interface DatabaseManager.
class PostgresManager implements DatabaseManager {
	
	dtbase: any;

	initiateDB(){
		const db = pgp(PGCONNECTION_URI);
		this.dtbase = db;
	}

	saveActivity (activity: any) {
		return this.dtbase.none('insert into apctf.activities(activity_id) values ($1)', [activity.activityID]);
	};

	getActivityDetails (activityID: any) {
		return this.dtbase.oneOrNone('select * from apctf.activities where activity_id = $1', [activityID]);
	};

	saveStudent (activityStudent: any) {
		return this.dtbase.none('insert into apctf.students(invenira_std_id,activity_id_fk,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) values ($1,$2,false,false,false,false,false,false,false)', [activityStudent.InveniRAstdID,activityStudent.activityID]);
	};

	getStudent (activityStudent: any) {
		return this.dtbase.oneOrNone('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where invenira_std_id = $1 and activity_id_fk = $2', [activityStudent.InveniRAstdID,activityStudent.activityID]);
	};

	updateActivity (activityID: any, activityStudent: any) {
		return this.dtbase.none('update apctf.activities set instrucoesacesso = $1, instrucoesobjetivo = $2, act_flag = $3, dica1 = $4, dica2 = $5, dica3 = $6 where activity_id = $7', [activityStudent.json_params.instrucoesacesso, activityStudent.json_params.instrucoesobjetivo, activityStudent.json_params.flag, activityStudent.json_params.dica1, activityStudent.json_params.dica2, activityStudent.json_params.dica3, activityID]);
	};

	deleteActivity (activityID: any) {
		return this.dtbase.none('delete from apctf.activities where activity_id = $1', [activityID]);
	};

	getAnalytics(activityID: any){
		return this.dtbase.query('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where activity_id_fk = $1', [activityID]);
	};

	saveAnalytics(analytics: any){
		return this.dtbase.none('update apctf.students set acessoatividade = $1, acessoinstrucoes = $2, acessoobjetivo = $3, acertouflag = $4, acessodica1 = $5, acessodica2 = $6, acessodica3 = $7 where invenira_std_id = $8 and activity_id_fk = $9', [analytics.json_params.acessoatividade, analytics.json_params.acessoinstrucoes, analytics.json_params.acessoobjetivo, analytics.json_params.acertouflag, analytics.json_params.acessodica1, analytics.json_params.acessodica2, analytics.json_params.acessodica3, analytics.InveniRAstdID, analytics.activityID]);
	};
}


//Concrete Product MongoDB - Implementa a Interface DatabaseManager.
class MongoDBManager implements DatabaseManager {
	
	dtbase: any;

	initiateDB(){
		mongoose.connect(MGDBCONNECTION_URI, {
			useMongoClient: true
		})
		this.dtbase = mongoose;
	}

	saveActivity (activity: any) {
		//Desenvolver se necessário
	};

	getActivityDetails (activityID: any) {
		//Desenvolver se necessário
	};

	saveStudent (activityStudent: any) {
		//Desenvolver se necessário
	};

	getStudent (activityStudent: any) {
		//Desenvolver se necessário
	};

	updateActivity (activityID: any, activityStudent: any) {
		//Desenvolver se necessário
	};

	deleteActivity (activityID: any) {
		//Desenvolver se necessário
	};

	getAnalytics(activityID: any){
		//Desenvolver se necessário
	};

	saveAnalytics(analytics: any){
		//Desenvolver se necessário
	};
}

module.exports = {
	DatabaseManagerFactory,
	PostgresManagerFactory,
	MongoDBManagerFactory,
	PostgresManager,
	MongoDBManager
}