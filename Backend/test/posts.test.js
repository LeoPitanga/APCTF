const crypto = require('crypto');
const axios = require('axios');
const activitiesData = require('../data/activitiesData');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data });
};

/*
test('Should get posts', async function () {
	const post1 = await activitiesData.savePost({ title: generate(), content: generate() });
	const post2 = await activitiesData.savePost({ title: generate(), content: generate() });
	const post3 = await activitiesData.savePost({ title: generate(), content: generate() });
	const response = await request('http://localhost:3000/posts', 'get');
	const posts = response.data;
	expect(posts).toHaveLength(3);
	await activitiesData.deletePost(post1.id);
	await activitiesData.deletePost(post2.id);
	await activitiesData.deletePost(post3.id);
});
*/

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

/*
test('Should update a post', async function () {
	const post = await activitiesData.savePost({ title: generate(), content: generate() });
	post.title = generate();
	post.content = generate();
	await request(`http://localhost:3000/posts/${post.id}`, 'put', post);
	const updatedPost = await activitiesData.getPost(post.id);
	expect(updatedPost.title).toBe(post.title);
	expect(updatedPost.content).toBe(post.content);
	await activitiesData.deletePost(post.id);
});

test('Should delete a post', async function () {
	const post = await activitiesData.savePost({ title: generate(), content: generate() });
	await request(`http://localhost:3000/posts/${post.id}`, 'delete');
	const posts = await activitiesData.getPosts();
	expect(posts).toHaveLength(0);
});

*/