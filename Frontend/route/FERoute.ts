import express, { Request, Response, NextFunction } from 'express';
const FErouter = express.Router();

const frontfacade = require('../facade/frontfacade');
const databaseManager = require('../../Backend/data/databaseManager');

//Main Student Page
FErouter.get('/:activityID/:InveniRAstdID', async function (req: Request, res: Response) {
	
	let activityID = req.params.activityID;
    let InveniRAstdID = req.params.InveniRAstdID;

    let frontFacade = new frontfacade();

    let studentActivity = await frontFacade.getStudentActivity(activityID,InveniRAstdID);

    let htmlBody = '<!DOCTYPE html><html lang = "pt"><head><meta charset = "UTF-8"><title>CTF</title></head>'
    
    htmlBody += '<body><h1>Capture The Flag</h1></br></br></br>'
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.instrucoesacesso+'" id="instructions" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="instructionsBtt" name="button" class="button" value="instructionsBtt"> <span> <span>Ler Instruções</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.instrucoesobjetivo+'" id="objective" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="objectiveBtt" name="button" class="button" value="objectiveBtt"> <span> <span>Ler Objetivo</span><br/> </span></button> <br/><br/><br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<span style="display:inline-block;width:100%;resize:both;overflow:hidden;padding-right:10px;border:1px solid blue">'
    htmlBody += '<input style="width:100%;height:50px;border:1px solid blue" type="text" placeholder="'+studentActivity.json_params.flag+'" id="flag" name="flag" value=""/>';
    htmlBody += '</span>'
    htmlBody += '<button id="enviarFlagBtt" name="button" type=submit class="button" value="enviarFlagBtt"> <span> <span>Enviar Flag</span><br/> </span></button>'
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica1+'" id="dica1" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica1Btt" name="button" class="button" value="dica1Btt"> <span> <span>Ler Dica 1</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica2+'" id="dica2" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica2Btt" name="button" class="button" value="dica2Btt"> <span> <span>Ler Dica 2</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica3+'" id="dica3" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica3Btt" name="button" class="button" value="dica3Btt"> <span> <span>Ler Dica 3</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    htmlBody += '</body></html>'
    
/* 	let studentStatusjson = [];    
    
    let studentStatus = await databaseManager.getStudent({"activityID":req.params.activityID,"InveniRAstdID":req.params.InveniRAstdID})

    let inveniraStdID1 = studentStatus.row.replace('(',"").replace(')',"").split(",")[0];
    let acessoAtividade1 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
    let acessoInstrucoes1 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[2].replace('t','true').replace('f','false') === 'true');
    let acessoObjetivo1 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[3].replace('t','true').replace('f','false') === 'true');
    let acertouFlag1 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[4].replace('t','true').replace('f','false') === 'true');
    let acessoDica11 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[5].replace('t','true').replace('f','false') === 'true');
    let acessoDica21 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[6].replace('t','true').replace('f','false') === 'true');
    let acessoDica31 = (studentStatus.row.replace('(',"").replace(')',"").split(",")[7].replace('t','true').replace('f','false') === 'true');


    studentStatusjson.push({
        inveniraStdID : inveniraStdID1,
        quantAnalytics : [acessoAtividade1,acessoInstrucoes1,acessoObjetivo1,acertouFlag1,acessoDica11,acessoDica21,acessoDica31]
    });


    console.log(__dirname); */
	//res.json(studentStatusjson);
 
    //res.sendFile(__dirname + "\\" + "app.html");
    res.send(htmlBody);
});

FErouter.post('/:activityID/:InveniRAstdID', async function (req: Request, res: Response) {
    //console.log(req.params.activityID);
	//console.log(req.params.InveniRAstdID);
	//console.log(await databaseManager.getActivityDetails(req.params.activityID));
    
    /* const data = { 
		"activityID":activityID,
		"InveniRAstdID":InveniRAstdID,
		"json_params":{
		   "acessoatividade":true,
		   "acessoinstrucoes":true,
		   "acessoobjetivo":true,
		   "acertouflag":true,
		   "acessodica1":true,
		   "acessodica2":false,
		   "acessodica3":false,
		}
	};
	await databaseManager.saveAnalytics(data); */

    
    //console.log(req.body);

    let activityID = req.params.activityID;
    let InveniRAstdID = req.params.InveniRAstdID;

    let frontFacade = new frontfacade();

    let studentActivity = await frontFacade.setStudentActivity(activityID,InveniRAstdID,{"tipo":req.body.button,"flag":req.body.flag});

    let htmlBody = '<!DOCTYPE html><html lang = "pt"><head><meta charset = "UTF-8"><title>CTF</title></head>'
    
    htmlBody += '<body><h1>Capture The Flag</h1></br></br></br>'
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.instrucoesacesso+'" id="instructions" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="instructionsBtt" name="button" class="button" value="instructionsBtt"> <span> <span>Ler Instruções</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.instrucoesobjetivo+'" id="objective" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="objectiveBtt" name="button" class="button" value="objectiveBtt"> <span> <span>Ler Objetivo</span><br/> </span></button> <br/><br/><br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    
    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<span style="display:inline-block;width:100%;resize:both;overflow:hidden;padding-right:10px;border:1px solid blue">'
    htmlBody += '<input style="width:100%;height:50px;border:1px solid blue" type="text" placeholder="'+studentActivity.json_params.flag+'" id="flag" name="flag" value=""/>';
    htmlBody += '</span>'
    htmlBody += '<button id="enviarFlagBtt" name="button" type=submit class="button" value="enviarFlagBtt"> <span> <span>Enviar Flag</span><br/> </span></button>'
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica1+'" id="dica1" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica1Btt" name="button" class="button" value="dica1Btt"> <span> <span>Ler Dica 1</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica2+'" id="dica2" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica2Btt" name="button" class="button" value="dica2Btt"> <span> <span>Ler Dica 2</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';

    htmlBody += '<form action="/ctf/'+activityID+'/'+InveniRAstdID+'" method="post"><fieldset>'
    htmlBody += '<textarea placeholder="'+studentActivity.json_params.dica3+'" id="dica3" disabled class="home-textarea textarea"></textarea>';
    htmlBody += '<button id="dica3Btt" name="button" class="button" value="dica3Btt"> <span> <span>Ler Dica 3</span><br/> </span></button> <br/><br/>';
    htmlBody += '</fieldset></form> <br/><br/>';
    htmlBody += '</body></html>'

    res.send(htmlBody);
});



module.exports = FErouter;