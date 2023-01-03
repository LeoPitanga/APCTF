"use strict";
const pgp = require('pg-promise')();
const PGCONNECTION_URI = process.env.POSTGRES_URI || 'postgres://postgres:123321@localhost:5432/apctf';
const mongoose = require('mongoose');
const MGDBCONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/apctf';
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
//Database Factory
class DatabaseManagerFactory {
    //Factory Method - Retornaria objeto do tipo DatabaseManager, se o Javascript permitisse declarar o retorno do método.
    getDatabaseManager() { }
    ;
}
//Postgres Factory - Concrete Class - herda de DatabaseManagerFactory.
class PostgresManagerFactory extends DatabaseManagerFactory {
    //Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
    getDatabaseManager() {
        const postgresManager = new PostgresManager();
        postgresManager.initiateDB();
        return postgresManager;
    }
    ;
}
//MongoDB Factory - Concrete Class - herda de DatabaseManagerFactory.
class MongoDBManagerFactory extends DatabaseManagerFactory {
    //Factory Method - Retorna objeto do tipo PostgresManager, embora Javascript não permita declarar o tipo de retorno do método.
    getDatabaseManager() {
        const postgresManager = new PostgresManager();
        postgresManager.initiateDB();
        return postgresManager;
    }
    ;
}
//Concrete Product Postgres - Implementa a Interface DatabaseManager.
class PostgresManager {
    initiateDB() {
        const db = pgp(PGCONNECTION_URI);
        this.dtbase = db;
    }
    saveActivity(activity) {
        return this.dtbase.none('insert into apctf.activities(activity_id) values ($1)', [activity.activityID]);
    }
    ;
    getActivityDetails(activityID) {
        return this.dtbase.oneOrNone('select * from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityInstructions(activityID) {
        return this.dtbase.oneOrNone('select instrucoesacesso from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityObjective(activityID) {
        return this.dtbase.oneOrNone('select instrucoesobjetivo from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityFlag(activityID) {
        return this.dtbase.oneOrNone('select act_flag from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityDica1(activityID) {
        return this.dtbase.oneOrNone('select dica1 from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityDica2(activityID) {
        return this.dtbase.oneOrNone('select dica2 from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getActivityDica3(activityID) {
        return this.dtbase.oneOrNone('select dica3 from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    saveStudent(activityStudent) {
        return this.dtbase.none('insert into apctf.students(invenira_std_id,activity_id_fk,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) values ($1,$2,false,false,false,false,false,false,false)', [activityStudent.InveniRAstdID, activityStudent.activityID]);
    }
    ;
    getStudent(activityStudent) {
        return this.dtbase.oneOrNone('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where invenira_std_id = $1 and activity_id_fk = $2', [activityStudent.InveniRAstdID, activityStudent.activityID]);
    }
    ;
    updateActivity(activityID, activityStudent) {
        return this.dtbase.none('update apctf.activities set instrucoesacesso = $1, instrucoesobjetivo = $2, act_flag = $3, dica1 = $4, dica2 = $5, dica3 = $6 where activity_id = $7', [activityStudent.json_params.instrucoesacesso, activityStudent.json_params.instrucoesobjetivo, activityStudent.json_params.flag, activityStudent.json_params.dica1, activityStudent.json_params.dica2, activityStudent.json_params.dica3, activityID]);
    }
    ;
    deleteActivity(activityID) {
        return this.dtbase.none('delete from apctf.activities where activity_id = $1', [activityID]);
    }
    ;
    getAnalytics(activityID) {
        return this.dtbase.query('select (invenira_std_id,acessoatividade,acessoinstrucoes,acessoobjetivo,acertouflag,acessodica1,acessodica2,acessodica3) from apctf.students where activity_id_fk = $1', [activityID]);
    }
    ;
    saveAnalytics(analytics) {
        return this.dtbase.none('update apctf.students set acessoatividade = $1, acessoinstrucoes = $2, acessoobjetivo = $3, acertouflag = $4, acessodica1 = $5, acessodica2 = $6, acessodica3 = $7 where invenira_std_id = $8 and activity_id_fk = $9', [analytics.json_params.acessoatividade, analytics.json_params.acessoinstrucoes, analytics.json_params.acessoobjetivo, analytics.json_params.acertouflag, analytics.json_params.acessodica1, analytics.json_params.acessodica2, analytics.json_params.acessodica3, analytics.InveniRAstdID, analytics.activityID]);
    }
    ;
    setActivityAccess(activityID, inveniraStdID) {
        return this.dtbase.none('update apctf.students set acessoatividade = true where activity_id_fk = $1 AND invenira_std_id = $2', [activityID, inveniraStdID]);
    }
    ;
    setStudentActivityInstructions(activityID, InveniRAstdID) {
        return this.dtbase.none('update apctf.students set acessoinstrucoes = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
    setStudentActivityObjective(activityID, InveniRAstdID) {
        return this.dtbase.none('update apctf.students set acessoobjetivo = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
    setStudentActivityFlag(activityID, InveniRAstdID, flag) {
        return this.dtbase.none('update apctf.students set acertouflag = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
    setStudentActivityDica1(activityID, InveniRAstdID) {
        return this.dtbase.none('update apctf.students set acessodica1 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
    setStudentActivityDica2(activityID, InveniRAstdID) {
        return this.dtbase.none('update apctf.students set acessodica2 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
    setStudentActivityDica3(activityID, InveniRAstdID) {
        return this.dtbase.none('update apctf.students set acessodica3 = true where activity_id_fk = $1 and invenira_std_id = $2', [activityID, InveniRAstdID]);
    }
}
//Concrete Product MongoDB - Implementa a Interface DatabaseManager.
class MongoDBManager {
    setActivityAccess(activityID, activityStudent) {
        throw new Error("Method not implemented.");
    }
    getActivityInstructions(activity) {
        throw new Error("Method not implemented.");
    }
    getActivityObjective(activity) {
        throw new Error("Method not implemented.");
    }
    getActivityFlag(activity) {
        throw new Error("Method not implemented.");
    }
    getActivityDica1(activity) {
        throw new Error("Method not implemented.");
    }
    getActivityDica2(activity) {
        throw new Error("Method not implemented.");
    }
    getActivityDica3(activity) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityInstructions(activityID, InveniRAstdID) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityObjective(activityID, InveniRAstdID) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityFlag(activityID, InveniRAstdID, flag) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityDica1(activityID, InveniRAstdID) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityDica2(activityID, InveniRAstdID) {
        throw new Error("Method not implemented.");
    }
    setStudentActivityDica3(activityID, InveniRAstdID) {
        throw new Error("Method not implemented.");
    }
    initiateDB() {
        mongoose.connect(MGDBCONNECTION_URI, {
            useMongoClient: true
        });
        this.dtbase = mongoose;
    }
    saveActivity(activity) {
        //Desenvolver se necessário
    }
    ;
    getActivityDetails(activityID) {
        //Desenvolver se necessário
    }
    ;
    saveStudent(activityStudent) {
        //Desenvolver se necessário
    }
    ;
    getStudent(activityStudent) {
        //Desenvolver se necessário
    }
    ;
    updateActivity(activityID, activityStudent) {
        //Desenvolver se necessário
    }
    ;
    deleteActivity(activityID) {
        //Desenvolver se necessário
    }
    ;
    getAnalytics(activityID) {
        //Desenvolver se necessário
    }
    ;
    saveAnalytics(analytics) {
        //Desenvolver se necessário
    }
    ;
}
module.exports = {
    DatabaseManagerFactory,
    PostgresManagerFactory,
    MongoDBManagerFactory,
    PostgresManager,
    MongoDBManager
};
