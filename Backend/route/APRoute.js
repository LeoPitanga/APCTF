const express = require('express');
const router = express.Router();
//const activitiesData = require('../data/activitiesData');
const databaseManager = require('../data/databaseManager');

const crypto = require('crypto');
const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

/* Ficheiro Registo:
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
	res.json({
		"name": "Capture The Flag",
		"config_url": "https://apctf.herokuapp.com/configuracao-atividade.html",
		"json_params_url": "https://apctf.herokuapp.com/json-params-atividade",
		"user_url": "https://apctf.herokuapp.com/deploy-atividade",
		"analytics_url": "https://apctf.herokuapp.com/analytics-atividade",
		"analytics_list_url": "https://apctf.herokuapp.com/lista-analytics-atividade"
		} );
});

router.get('/configuracao-atividade.html', async function (req, res) {
	res.json("Página de Configuração Atividade");
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

router.post('/analytics-atividade', async function (req, res) {
	const activityID = req.body.activityID;
	analytics = await databaseManager.getAnalytics(activityID);
	res.json(analytics);
	/* res.json([
		{
		  "inveniraStdID": 1001,
		  "quantAnalytics": [
			{
			  "name": "acessoAtividade",
			  "value": true
			},
			{
			  "name": "acessoInstrucoes",
			  "value": true
			},
			{
			  "name": "acessoObjetivo",
			  "value": true
			},
			{
				"name": "acertouFlag",
				"value": true
			},
			{
				"name": "acessoDica1",
				"value": true
			},
			{
				"name": "acessoDica2",
				"value": false
			},
			{
				"name": "acessoDica3",
				"value": false
			}
		  ]
		},
		{
			"inveniraStdID": 1002,
			"quantAnalytics": [
			  {
				"name": "acessoAtividade",
				"value": true
			  },
			  {
				"name": "acessoInstrucoes",
				"value": true
			  },
			  {
				"name": "acessoObjetivo",
				"value": true
			  },
			  {
				  "name": "acertouFlag",
				  "value": false
			  },
			  {
				  "name": "acessoDica1",
				  "value": true
			  },
			  {
				  "name": "acessoDica2",
				  "value": true
			  },
			  {
				  "name": "acessoDica3",
				  "value": true
			  }
			]
		}
	]); */
});

router.post('/deploy-atividade', async function (req, res) {
	const activity = req.body;
	//console.log(activity.activityID);
	await databaseManager.saveActivity(activity);
	url1 = "https://apctf.herokuapp.com/deploy-atividade/"+activity.activityID;
	//console.log(activity.activityID)
	//console.log({url: url1})
	res.json({url: url1});
});

router.post('/deploy-atividade/:activityID', async function (req, res) {
	const activityStudent = req.body;
	//console.log(activityStudent.activityID)
	await databaseManager.saveStudent(activityStudent);
	await databaseManager.updateActivity(req.params.activityID, activityStudent);
	url1 = "https://apctf.herokuapp.com/ctf/"+req.params.activityID+"/"+activityStudent.InveniRAstdID;
	//console.log(url1);
	res.json({url: url1});
});

//FrontEnd - Migrar!
router.get('/ctf/:activityID/:InveniRAstdID', async function (req, res) {
	
	console.log(req.params.activityID);
	console.log(req.params.InveniRAstdID);
	console.log(await databaseManager.getActivityDetails(req.params.activityID));

	const data = { 
		"activityID":req.params.activityID,
		"InveniRAstdID":req.params.InveniRAstdID,
		"json_params":{
		   "acessoatividade":true,
		   "acessoinstrucoes":true,
		   "acessoobjetivo":true,
		   "acertouflag":false,
		   "acessodica1":false,
		   "acessodica2":false,
		   "acessodica3":false,
		}
	};
	//console.log(data);
	await databaseManager.saveAnalytics(data);

	res.json("Ok!");
});

router.get('/criarActivity', async function (req, res) {
	const data = { 
		activityID:generate(),
		InveniRAstdID:generate(),
		json_params:{
		   "instrucoesacesso":"instrucoes",
		   "instrucoesobjetivo":"objetivo",
		   "flag":"g45hgh4th454hg45h6464u565756",
		   "dica1":"Dica: Vá por ali",
		   "dica2":"Dica: Vá por acolá",
		   "dica3":"Dica: Não vá"
		}
	};
	await databaseManager.saveActivity(data);
	await databaseManager.saveStudent(data);
	await databaseManager.updateActivity(data.activityID, data);
	res.json("Foi!");
});

module.exports = router;