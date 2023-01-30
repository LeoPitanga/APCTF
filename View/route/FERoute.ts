import express, { Request, Response, NextFunction } from 'express';
const FErouter = express.Router();

const studentInfo = require('../facade/StudentInfoFacade');

//Main Student Page
FErouter.get('/:activityID/:InveniRAstdID', async function (req: Request, res: Response) {
	
	let activityID = req.params.activityID;
    let InveniRAstdID = req.params.InveniRAstdID;

    //let studentInfo = new StudentInfoFacade();

    let studentActivity = await studentInfo.getStudentActivity(activityID,InveniRAstdID);

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

FErouter.post('/:activityID/:InveniRAstdID', async function (req: Request, res: Response) {

    let activityID = req.params.activityID;
    let InveniRAstdID = req.params.InveniRAstdID;

    let action = {"tipo":req.body.button,"flag":req.body.flag};
    let studentActivity = await studentInfo.setStudentActivity(activityID,InveniRAstdID,action);

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