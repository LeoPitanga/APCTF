const database = require('../infra/database');

exports.getPosts = function () {
	return database.query('select * from blog.post');
};

exports.getPost = function (id) {
	return database.oneOrNone('select * from blog.post where id = $1', [id]);
};

exports.saveActivity = function (activity) {
	return database.none('insert into apctf.activities(activity_id) values ($1)', [activity.activityID]);
};

exports.saveStudent = function (activityStudent) {
	
	return database.none('insert into apctf.students(invenira_std_id,activity_id_fk) values ($1,$2)', [activityStudent.InveniRAstdID,activityStudent.activityID]);
};

exports.updateActivity = function (activityID, activityStudent) {
	return database.none('update apctf.activities set instrucoesacesso = $1, instrucoesobjetivo = $2, act_flag = $3, dica1 = $4, dica2 = $5, dica3 = $6 where activity_id = $7', [activityStudent.json_params.instrucoesacesso, activityStudent.json_params.instrucoesobjetivo, activityStudent.json_params.flag, activityStudent.json_params.dica1, activityStudent.json_params.dica2, activityStudent.json_params.dica3, activityID]);
};

exports.deleteActivity = function (id) {
	return database.none('delete from apctf.activities where activity_id = $1', [id]);
};
