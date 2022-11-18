const express = require('express');
const router = express.Router();
const activitiesData = require('../data/activitiesData');

/* Ficheiro Registo (a saber se será provido pela API):
{
"name": "Capture The Flag",

"config_url": "http://<domínio>/configuracao-atividade.html",
OK!!!"json_params_url": "http:// <domínio>/json-para'ms-atividade",
OK!!!(FALTA RETORNAR URL FRONTEND ESTUDANTE)"user_url": "http://<domínio>/deploy-atividade",
"analytics_url": "http://<domínio>/analytics-atividade",
OK!!!"analytics_list_url": "http://<domínio>/lista-analytics-atividade"
} 

*/

router.get('/', async function (req, res) {
	res.end();
});

router.get('/configuracao-atividade.html', async function (req, res) {
	res.json(0fjdsjkfdskj);
});

router.get('/analytics-atividade', async function (req, res) {
	res.json(0fjdsjkfdskj);
});

router.get('/json-params-atividade', async function (req, res) {
	res.json([
			{"name": "instrucoesacesso", "type": "text/plain"},
			{"name": "instrucoesobjetivo", "type": "text/plain"},
			{"name": "flag", "type": "text/plain"},
			{"name": "dica1", "type": "text/plain"},
			{"name": "dica2", "type": "text/plain"},
			{"name": "dica3", "type": "text/plain"},
	]);
});

router.get('/lista-analytics-atividade', async function (req, res) {
	res.json({
			"quantAnalytics": [ 
				{"name": "acessoAtividade", "type": "boolean"},
				{"name": "acessoInstrucoes", "type": "boolean"},
				{"name": "acessoObjetivo", "type": "boolean"},
				{"name": "acertouFlag", "type": "boolean"},
				{"name": "acessoDica1", "type": "boolean"},
				{"name": "acessoDica2", "type": "boolean"},
				{"name": "acessoDica3", "type": "boolean"}
			]
		}
		);
});

router.post('/deploy-atividade', async function (req, res) {
	const activity = req.body;
	//console.log(activity.activityID);
	const newActivity = await activitiesData.saveActivity(activity);
	url1 = "http://localhost:3000/deploy-atividade/"+activity.activityID;
	//console.log(activity.activityID)
	//console.log({url: url1})
	res.json({url: url1});
});

router.post('/deploy-atividade/:activityID', async function (req, res) {
	const activityStudent = req.body;
	//console.log(activityStudent.activityID)
	await activitiesData.saveStudent(activityStudent);
	await activitiesData.updateActivity(req.params.activityID, activityStudent);
	url1 = "http://localhost:3000/?ctf="+req.params.activityID+activityStudent.InveniRAstdID;
	console.log(url1);
	res.json({url: url1});
});

/* Backup
router.get('/json-params-atividade', async function (req, res) {
	const posts = await activitiesData.getPosts();
	res.json(posts);
});
*/



router.post('/posts', async function (req, res) {
	const post = req.body;
	const newPost = await activitiesData.savePost(post);
	res.json(newPost);
});

router.put('/posts/:id', async function (req, res) {
	const post = req.body;
	await activitiesData.updatePost(req.params.id, post);
	res.end();
});

router.delete('/posts/:id', async function (req, res) {
	await activitiesData.deletePost(req.params.id);
	res.end();
});

module.exports = router;
