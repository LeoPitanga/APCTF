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
const router = express_1.default.Router();
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
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            "name": "Capture The Flag",
            "config_url": "https://apctf.herokuapp.com/configuracao-atividade.html",
            "json_params_url": "https://apctf.herokuapp.com/json-params-atividade",
            "user_url": "https://apctf.herokuapp.com/deploy-atividade",
            "analytics_url": "https://apctf.herokuapp.com/analytics-atividade",
            "analytics_list_url": "https://apctf.herokuapp.com/lista-analytics-atividade"
        });
    });
});
router.get('/configuracao-atividade.html', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json("Página de Configuração Atividade");
    });
});
router.get('/json-params-atividade', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json([
            { "name": "instrucoesacesso", "type": "text/plain" },
            { "name": "instrucoesobjetivo", "type": "text/plain" },
            { "name": "flag", "type": "text/plain" },
            { "name": "dica1", "type": "text/plain" },
            { "name": "dica2", "type": "text/plain" },
            { "name": "dica3", "type": "text/plain" },
        ]);
    });
});
router.get('/lista-analytics-atividade', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            "quantAnalytics": [
                { "name": "acessoAtividade", "type": "boolean" },
                { "name": "acessoInstrucoes", "type": "boolean" },
                { "name": "acessoObjetivo", "type": "boolean" },
                { "name": "acertouFlag", "type": "boolean" },
                { "name": "acessoDica1", "type": "boolean" },
                { "name": "acessoDica2", "type": "boolean" },
                { "name": "acessoDica3", "type": "boolean" }
            ]
        });
    });
});
router.post('/analytics-atividade', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const activityID = req.body.activityID;
        //Testa se existe ActivityID no Json da Requisição
        if (!(activityID === null) && !(activityID === undefined)) {
            //Testa se a Atividade Existe
            if (yield databaseManager.getActivityDetails(activityID)) {
                let analytics = yield databaseManager.getAnalytics(activityID);
                let analyticsjson = [];
                //Testa de a Atividade tem Analytics
                if (analytics.length) {
                    for (var i = 0; i < analytics.length; i++) {
                        let inveniraStdID1 = analytics[i].row.replace('(', "").replace(')', "").split(",")[0];
                        let acessoAtividade1 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[1].replace('t', 'true').replace('f', 'false') === 'true');
                        let acessoInstrucoes1 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[2].replace('t', 'true').replace('f', 'false') === 'true');
                        let acessoObjetivo1 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[3].replace('t', 'true').replace('f', 'false') === 'true');
                        let acertouFlag1 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[4].replace('t', 'true').replace('f', 'false') === 'true');
                        let acessoDica11 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[5].replace('t', 'true').replace('f', 'false') === 'true');
                        let acessoDica21 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[6].replace('t', 'true').replace('f', 'false') === 'true');
                        let acessoDica31 = (analytics[i].row.replace('(', "").replace(')', "").split(",")[7].replace('t', 'true').replace('f', 'false') === 'true');
                        analyticsjson.push({
                            inveniraStdID: inveniraStdID1,
                            quantAnalytics: [acessoAtividade1, acessoInstrucoes1, acessoObjetivo1, acertouFlag1, acessoDica11, acessoDica21, acessoDica31]
                        });
                    }
                    res.json(analyticsjson);
                }
                else {
                    res.status(500).send('Erro! Atividade sem Analytics!');
                }
            }
            else {
                res.status(400).send('Erro! Atividade não encontrada!');
            }
        }
        else {
            res.status(400).send('Erro! Favor verificar json da Requisição!');
        }
    });
});
router.post('/deploy-atividade', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const activity = req.body;
        //Testa se existe ActivityID no Json da Requisição
        if (!(activity.activityID === null) && !(activity.activityID === undefined)) {
            //Testa se Atividade já não existe
            if ((yield databaseManager.getActivityDetails(activity.activityID)) === null) {
                yield databaseManager.saveActivity(activity);
                let url1 = "https://apctf.herokuapp.com/deploy-atividade/" + activity.activityID;
                res.json({ url: url1 });
            }
            else {
                res.status(400).send('Erro! Atividade ' + activity.activityID + ' já existe!');
            }
        }
        else {
            res.status(400).send('Erro! Favor verificar json da Requisição!');
        }
    });
});
router.post('/deploy-atividade/:activityID', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const activityStudent = req.body;
        yield databaseManager.saveStudent(activityStudent);
        yield databaseManager.updateActivity(req.params.activityID, activityStudent);
        let url1 = "https://apctf.herokuapp.com/ctf/" + req.params.activityID + "/" + activityStudent.InveniRAstdID;
        res.json({ url: url1 });
    });
});
router.get('/criarActivityExemplo', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        stdIDexemplo++;
        const data = {
            activityID: "atividadeexemplo",
            InveniRAstdID: stdIDexemplo,
            json_params: {
                "instrucoesacesso": "instrucoes",
                "instrucoesobjetivo": "objetivo",
                "flag": "g45hgh4th454hg45h6464u565756",
                "dica1": "Dica: Vá por ali",
                "dica2": "Dica: Vá por acolá",
                "dica3": "Dica: Não vá"
            }
        };
        try {
            yield databaseManager.saveActivity(data);
            yield databaseManager.updateActivity(data.activityID, data);
            res.json("Foi!");
        }
        catch (error) {
            //next(error);
            res.status(400).send('Erro! A atividade já está cadastrada!');
        }
    });
});
router.get('/criarStudentExemplo', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        stdIDexemplo++;
        const data = {
            activityID: "atividadeexemplo",
            InveniRAstdID: stdIDexemplo,
            json_params: {
                "instrucoesacesso": "instrucoes",
                "instrucoesobjetivo": "objetivo",
                "flag": "g45hgh4th454hg45h6464u565756",
                "dica1": "Dica: Vá por ali",
                "dica2": "Dica: Vá por acolá",
                "dica3": "Dica: Não vá"
            }
        };
        yield databaseManager.saveStudent(data);
        res.json("Foi!");
    });
});
module.exports = router;
