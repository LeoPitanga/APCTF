import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
const databaseManager = require('../data/DBManager');

let stdIDexemplo = 1;

/* Ficheiro Registo:
{
"name": "Capture The Flag",

"config_url": "http://<domínio>/configuracao-atividade.html",
"json_params_url": "http:// <domínio>/json-para'ms-atividade",
"user_url": "http://<domínio>/deploy-atividade",
"analytics_url": "http://<domínio>/analytics-atividade",
"analytics_list_url": "http://<domínio>/lista-analytics-atividade"
} 
*/

router.get('/', async function (req: Request, res: Response) {
	res.json({
		"name": "Capture The Flag",
		"config_url": "https://apctf.herokuapp.com/configuracao-atividade.html",
		"json_params_url": "https://apctf.herokuapp.com/json-params-atividade",
		"user_url": "https://apctf.herokuapp.com/deploy-atividade",
		"analytics_url": "https://apctf.herokuapp.com/analytics-atividade",
		"analytics_list_url": "https://apctf.herokuapp.com/lista-analytics-atividade"
		} );
});

router.get('/configuracao-atividade.html', async function (req: Request, res: Response) {
	res.json("Página de Configuração Atividade");
});

router.get('/json-params-atividade', async function (req: Request, res: Response) {
	res.json([
			{"name": "instrucoesacesso", "type": "text/plain"},
			{"name": "instrucoesobjetivo", "type": "text/plain"},
			{"name": "flag", "type": "text/plain"},
			{"name": "dica1", "type": "text/plain"},
			{"name": "dica2", "type": "text/plain"},
			{"name": "dica3", "type": "text/plain"},
	]);
});

router.get('/lista-analytics-atividade', async function (req: Request, res: Response) {
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

router.post('/analytics-atividade', async function (req: Request, res: Response) {
	const activityID = req.body.activityID;
	
	//Testa se a Atividade Existe
	if (databaseManager.getAnalytics(activityID).length){
		let analytics: any = await databaseManager.getAnalytics(activityID);
		let analyticsjson = [];
		
		if (analytics.length) {
			for (var i = 0; i < analytics.length; i++) { 
				let inveniraStdID1 = analytics[i].row.replace('(',"").replace(')',"").split(",")[0];
				let acessoAtividade1 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
				let acessoInstrucoes1 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[2].replace('t','true').replace('f','false') === 'true');
				let acessoObjetivo1 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[3].replace('t','true').replace('f','false') === 'true');
				let acertouFlag1 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[4].replace('t','true').replace('f','false') === 'true');
				let acessoDica11 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[5].replace('t','true').replace('f','false') === 'true');
				let acessoDica21 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[6].replace('t','true').replace('f','false') === 'true');
				let acessoDica31 = (analytics[i].row.replace('(',"").replace(')',"").split(",")[7].replace('t','true').replace('f','false') === 'true');


				analyticsjson.push({
					inveniraStdID : inveniraStdID1,
					quantAnalytics : [acessoAtividade1,acessoInstrucoes1,acessoObjetivo1,acertouFlag1,acessoDica11,acessoDica21,acessoDica31]
				});
			}
			res.json(analyticsjson);
		}
		else {
			res.status(400).send('Erro! Atividade sem Analytics!');
		}
	} else {
		res.status(400).send('Erro! Atividade não encontrada!');
	}
	
});

router.post('/deploy-atividade', async function (req: Request, res: Response) {
	const activity = req.body;
	await databaseManager.saveActivity(activity);
	let url1 = "https://apctf.herokuapp.com/deploy-atividade/"+activity.activityID;
	res.json({url: url1});
});

router.post('/deploy-atividade/:activityID', async function (req: Request, res: Response) {
	const activityStudent = req.body;
	await databaseManager.saveStudent(activityStudent);
	await databaseManager.updateActivity(req.params.activityID, activityStudent);
	let url1 = "https://apctf.herokuapp.com/ctf/"+req.params.activityID+"/"+activityStudent.InveniRAstdID;
	res.json({url: url1});
});

router.get('/criarActivityExemplo', async function (req: Request, res: Response, next: NextFunction) {
	stdIDexemplo++;
	const data = { 
		activityID:"atividadeexemplo",
		InveniRAstdID:stdIDexemplo,
		json_params:{
		   "instrucoesacesso":"instrucoes",
		   "instrucoesobjetivo":"objetivo",
		   "flag":"g45hgh4th454hg45h6464u565756",
		   "dica1":"Dica: Vá por ali",
		   "dica2":"Dica: Vá por acolá",
		   "dica3":"Dica: Não vá"
		}
	};
	try {
		await databaseManager.saveActivity(data);
		await databaseManager.updateActivity(data.activityID, data);
		res.json("Foi!");
	  } catch (error) {
		//next(error);
		
		res.status(400).send('Erro! A atividade já está cadastrada!');
	  }
});

router.get('/criarStudentExemplo', async function (req: Request, res: Response) {
	stdIDexemplo++;
	const data = { 
		activityID:"atividadeexemplo",
		InveniRAstdID:stdIDexemplo,
		json_params:{
		   "instrucoesacesso":"instrucoes",
		   "instrucoesobjetivo":"objetivo",
		   "flag":"g45hgh4th454hg45h6464u565756",
		   "dica1":"Dica: Vá por ali",
		   "dica2":"Dica: Vá por acolá",
		   "dica3":"Dica: Não vá"
		}
	};
	await databaseManager.saveStudent(data);
	res.json("Foi!");
});



module.exports = router;