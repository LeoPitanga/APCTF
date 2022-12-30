"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FErouter = express_1.default.Router();
const frontfacade = require('../facade/frontfacade');
const databaseManager = require('../../Backend/data/databaseManager');
//Main Student Page
FErouter.get('/:activityID/:InveniRAstdID', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let activityID = req.params.activityID;
        let InveniRAstdID = req.params.InveniRAstdID;
        let frontFacade = new frontfacade();
        let studentActivity = yield frontFacade.getStudentActivity(activityID, InveniRAstdID);
        let htmlBody = '<h1>Capture The Flag</h1></br></br></br><textarea placeholder="' + studentActivity.json_params.instrucoesacesso + '" id="instructions" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="instructionsBtt" class="button"> <span> <span>Ler Instruções</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.instrucoesobjetivo + '" id="objective" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="objectiveBtt" class="button"> <span> <span>Ler Objetivo</span><br/> </span></button> <br/><br/><br/><br/>';
        htmlBody += '<form action="/ctf/' + activityID + '/' + InveniRAstdID + '" method="post">';
        htmlBody += '<span style="display:inline-block;width:100%;resize:both;overflow:hidden;padding-right:10px;border:1px solid blue">';
        htmlBody += '<input style="width:100%;height:300px;border:1px solid blue" type="text" placeholder="' + studentActivity.json_params.flag + '" id="Flag" class="home-textinput input"/>';
        htmlBody += '</span>';
        htmlBody += '<button id="enviarFlagBtt" type=submit class="button"> <span> <span>Enviar Flag</span><br/> </span></button></form> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica1 + '" id="dica1" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica1Btt" class="button"> <span> <span>Ler Dica 1</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica2 + '" id="dica2" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica2Btt" class="button"> <span> <span>Ler Dica 2</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica3 + '" id="dica3" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica3Btt" class="button"> <span> <span>Ler Dica 3</span><br/> </span></button> <br/><br/>';
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
});
FErouter.post('/:activityID/:InveniRAstdID', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let activityID = req.params.activityID;
        let InveniRAstdID = req.params.InveniRAstdID;
        let frontFacade = new frontfacade();
        let studentActivity = yield frontFacade.getStudentActivity(activityID, InveniRAstdID);
        let htmlBody = '<h1>Capture The Flag</h1></br></br></br><textarea placeholder="' + studentActivity.json_params.instrucoesacesso + '" id="instructions" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="instructionsBtt" class="button"> <span> <span>Ler Instruções</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.instrucoesobjetivo + '" id="objective" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="objectiveBtt" class="button"> <span> <span>Ler Objetivo</span><br/> </span></button> <br/><br/><br/><br/>';
        htmlBody += '<form action="/ctf/' + activityID + '/' + InveniRAstdID + '" method="post">';
        htmlBody += '<span style="display:inline-block;width:100%;resize:both;overflow:hidden;padding-right:10px;border:1px solid blue">';
        htmlBody += '<input style="width:100%;height:300px;border:1px solid blue" type="text" placeholder="' + studentActivity.json_params.flag + '" id="Flag" class="home-textinput input"/>';
        htmlBody += '</span>';
        htmlBody += '<button id="enviarFlagBtt" type=submit class="button"> <span> <span>Enviar Flag</span><br/> </span></button></form> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica1 + '" id="dica1" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica1Btt" class="button"> <span> <span>Ler Dica 1</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica2 + '" id="dica2" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica2Btt" class="button"> <span> <span>Ler Dica 2</span><br/> </span></button> <br/><br/>';
        htmlBody += '<textarea placeholder="' + studentActivity.json_params.dica3 + '" id="dica3" disabled class="home-textarea textarea"></textarea>';
        htmlBody += '<button id="dica3Btt" class="button"> <span> <span>Ler Dica 3</span><br/> </span></button> <br/><br/>';
        res.send(htmlBody);
    });
});
module.exports = FErouter;
