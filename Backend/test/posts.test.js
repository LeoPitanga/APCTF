const crypto = require('crypto');
const axios = require('axios');
const activitiesData = require('../data/activitiesData');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data });
};

test('Should save an Activity', async function () {
	const data = { activityID: generate() };
	const response = await request('http://localhost:3000/deploy-atividade', 'post', data);
	const activity = response.data;
	expect(activity.url).toBe("http://localhost:3000/deploy-atividade/"+data.activityID);
	await activitiesData.deleteActivity(data.activityID);
});

test('Should deploy an Activity and Student', async function () {
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
	const responseDeployAct = await request('http://localhost:3000/deploy-atividade', 'post', data);

	const responseDeployStd = await request(responseDeployAct.data.url, 'post', data);
	//const responseDeployStd = await request('http://localhost:3000/deploy-atividade/${data.activityID}', 'post', data);
	//expect(activity.url).toBe("http://localhost:3000/executar-atividade/"+data.activityID+);
	//await activitiesData.deleteActivity(data.activityID);
});