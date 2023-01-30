import {DatabaseManager} from "./DatabaseManager";

//Concrete Product Postgres - Implementa a Interface DatabaseManager.
//Considerando o Padrão Estrutural ADAPTER, está classe é o Adapter que implementa a interface de comunicação do código cliente/API (DatabaseManager) com o serviço do PG-Promise (Postgresql).
export class PostgresManager implements DatabaseManager {
		
	dtbase: any;
	pgp = require('pg-promise')();
	PGCONNECTION_URI = process.env.POSTGRES_URI || 'postgres://postgres:123321@localhost:5432/apctf';

	initiateDB(){
		const db = this.pgp(this.PGCONNECTION_URI);
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

	getStudentAnalytics (activityStudent: any) {
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

	setStudentActivityAccess (activityID: any, inveniraStdID: any) {
		return this.dtbase.none('update apctf.students set acessoatividade = true where activity_id_fk = $1 AND invenira_std_id = $2', [activityID, inveniraStdID]);
	};

	setStudentActivityInstructions(activityID: any, InveniRAstdID: any) {
		return this.dtbase.none('update apctf.students set acessoinstrucoes = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
	setStudentActivityObjective(activityID: any, InveniRAstdID: any) {
		return this.dtbase.none('update apctf.students set acessoobjetivo = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
	setStudentActivityFlag(activityID: any, InveniRAstdID: any, flag: any) {
		return this.dtbase.none('update apctf.students set acertouflag = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
	setStudentActivityDica1(activityID: any, InveniRAstdID: any) {
		return this.dtbase.none('update apctf.students set acessodica1 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
	setStudentActivityDica2(activityID: any, InveniRAstdID: any) {
		return this.dtbase.none('update apctf.students set acessodica2 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
	setStudentActivityDica3(activityID: any, InveniRAstdID: any) {
		return this.dtbase.none('update apctf.students set acessodica3 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
	}
}