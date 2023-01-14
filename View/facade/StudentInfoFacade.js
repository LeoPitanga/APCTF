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
const databaseManager = require('../../API/data/databaseManager');
//Classe que implementa a interface da Facade
class StudentInfoFacade {
    //checa o status atual dos analytics do estudante e retorna as informações relacionadas ao último estado.
    getStudentActivity(activityID, InveniRAstdID) {
        return __awaiter(this, void 0, void 0, function* () {
            //checar se estudante está ativo
            //buscar informações do estudante
            let studentInformation = yield databaseManager.getStudentAnalytics({ "activityID": activityID, "InveniRAstdID": InveniRAstdID });
            let acessoAtividade = (studentInformation.row.replace('(', "").replace(')', "").split(",")[1].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoInstrucoes = (studentInformation.row.replace('(', "").replace(')', "").split(",")[2].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoObjetivo = (studentInformation.row.replace('(', "").replace(')', "").split(",")[3].replace('t', 'true').replace('f', 'false') === 'true');
            let acertouFlag = (studentInformation.row.replace('(', "").replace(')', "").split(",")[4].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica1 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[5].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica2 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[6].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica3 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[7].replace('t', 'true').replace('f', 'false') === 'true');
            //Informações Default
            let instrucoes = "Para ler as instruções clique no botão 'Ler Instruções'";
            let objetivo = "Para ler o objetivo clique no botão 'Ler Objetivo'";
            let flag = "FLAG INCORRETA/NÃO ENCONTRADA! Digite a flag correta neste campo e clique no botão 'Enviar Flag'.";
            let dica1 = "Para visualizar a primeira dica, clique no botão 'Ler Dica 1'";
            let dica2 = "Para visualizar a segunda dica, clique no botão 'Ler Dica 2'";
            let dica3 = "Para visualizar a terceira dica, clique no botão 'Ler Dica 3'";
            //atualiza Analytics de "Acesso Atividade", caso seja o primeiro acesso.
            if (!acessoAtividade) {
                yield databaseManager.setStudentActivityAccess(activityID, InveniRAstdID);
                //studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});
                //acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
            }
            else {
                //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
                let informacoes = yield databaseManager.getActivityDetails(activityID);
                if (acessoInstrucoes) {
                    instrucoes = informacoes.instrucoesacesso;
                }
                ;
                if (acessoObjetivo) {
                    objetivo = informacoes.instrucoesobjetivo;
                }
                ;
                if (acertouFlag) {
                    flag = "PARABÉNS!!! A FLAG INFORMADA ESTÁ CORRETA!!!";
                }
                ;
                if (acessoDica1) {
                    dica1 = informacoes.dica1;
                }
                ;
                if (acessoDica2) {
                    dica2 = informacoes.dica2;
                }
                ;
                if (acessoDica3) {
                    dica3 = informacoes.dica3;
                }
                ;
            }
            ;
            //Retornar informações PARA O FRONTEND
            return {
                "activityID": activityID,
                "InveniRAstdID": InveniRAstdID,
                "json_params": {
                    "instrucoesacesso": instrucoes,
                    "instrucoesobjetivo": objetivo,
                    "flag": flag,
                    "dica1": dica1,
                    "dica2": dica2,
                    "dica3": dica3,
                }
            };
        });
    }
    ;
    //
    setStudentActivity(activityID, InveniRAstdID, action) {
        return __awaiter(this, void 0, void 0, function* () {
            //checar se estudante está ativo
            //buscar informações do estudante
            let studentInformation = yield databaseManager.getStudentAnalytics({ "activityID": activityID, "InveniRAstdID": InveniRAstdID });
            let acessoAtividade = (studentInformation.row.replace('(', "").replace(')', "").split(",")[1].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoInstrucoes = (studentInformation.row.replace('(', "").replace(')', "").split(",")[2].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoObjetivo = (studentInformation.row.replace('(', "").replace(')', "").split(",")[3].replace('t', 'true').replace('f', 'false') === 'true');
            let acertouFlag = (studentInformation.row.replace('(', "").replace(')', "").split(",")[4].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica1 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[5].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica2 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[6].replace('t', 'true').replace('f', 'false') === 'true');
            let acessoDica3 = (studentInformation.row.replace('(', "").replace(')', "").split(",")[7].replace('t', 'true').replace('f', 'false') === 'true');
            //Informações Default
            let instrucoes = "Para ler as instruções clique no botão 'Ler Instruções'";
            let objetivo = "Para ler o objetivo clique no botão 'Ler Objetivo'";
            let flag = "FLAG INCORRETA/NÃO ENCONTRADA! Digite a flag correta neste campo e clique no botão 'Enviar Flag'.";
            let dica1 = "Para visualizar a primeira dica, clique no botão 'Ler Dica 1'";
            let dica2 = "Para visualizar a segunda dica, clique no botão 'Ler Dica 2'";
            let dica3 = "Para visualizar a terceira dica, clique no botão 'Ler Dica 3'";
            //atualiza Analytics de "Acesso Atividade", caso seja o primeiro acesso.
            if (!acessoAtividade) {
                yield databaseManager.setStudentActivityAccess(activityID, InveniRAstdID);
                //studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});
                //acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
            }
            else {
                //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
                let informacoes = yield databaseManager.getActivityDetails(activityID);
                switch (action.tipo) {
                    case "instructionsBtt":
                        yield databaseManager.setStudentActivityInstructions(activityID, InveniRAstdID);
                        acessoInstrucoes = true;
                        break;
                    case "objectiveBtt":
                        yield databaseManager.setStudentActivityObjective(activityID, InveniRAstdID);
                        acessoObjetivo = true;
                        break;
                    case "enviarFlagBtt":
                        if (action.flag === informacoes.act_flag) {
                            yield databaseManager.setStudentActivityFlag(activityID, InveniRAstdID, action.flag);
                            acertouFlag = true;
                        }
                        break;
                    case "dica1Btt":
                        yield databaseManager.setStudentActivityDica1(activityID, InveniRAstdID);
                        acessoDica1 = true;
                        break;
                    case "dica2Btt":
                        yield databaseManager.setStudentActivityDica2(activityID, InveniRAstdID);
                        acessoDica2 = true;
                        break;
                    case "dica3Btt":
                        yield databaseManager.setStudentActivityDica3(activityID, InveniRAstdID);
                        acessoDica3 = true;
                        break;
                }
                if (acessoInstrucoes) {
                    instrucoes = informacoes.instrucoesacesso;
                }
                ;
                if (acessoObjetivo) {
                    objetivo = informacoes.instrucoesobjetivo;
                }
                ;
                if (acertouFlag) {
                    flag = "PARABÉNS!!! A FLAG INFORMADA ESTÁ CORRETA!!!";
                }
                ;
                if (acessoDica1) {
                    dica1 = informacoes.dica1;
                }
                ;
                if (acessoDica2) {
                    dica2 = informacoes.dica2;
                }
                ;
                if (acessoDica3) {
                    dica3 = informacoes.dica3;
                }
                ;
            }
            ;
            //Retornar informações PARA O FRONTEND
            return {
                "activityID": activityID,
                "InveniRAstdID": InveniRAstdID,
                "json_params": {
                    "instrucoesacesso": instrucoes,
                    "instrucoesobjetivo": objetivo,
                    "flag": flag,
                    "dica1": dica1,
                    "dica2": dica2,
                    "dica3": dica3,
                }
            };
        });
    }
    ;
}
;
module.exports = new StudentInfoFacade();
