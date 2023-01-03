
const databaseManager = require('../../API/data/databaseManager');

/* 

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
PREZADOS PROFESSORES, ATENÇÃO, por gentileza!!! 

Somente ao revisar a minha pretensa implementação do padrão FACADE percebi que incorri em dois erros que provavelmente invalidam o padrão:

1) A Facade implementada trata apenas de um subsistema (DatabaseManager). Ao revisar o padrão, percebi que é esperado que haja interação do Facade com vários subsistemas (acho que esse ponto até que poderia não invalidar a implementação do padrão, mas certamente o descaracteriza um tanto).
2) Segundo o GoF, a Facade não deve implementar novas funcionalidades. Este é o principal erro que, ao meu ver, invalida a implementação do padrão no meu projeto, uma vez que a minha pretensa FACADE realiza operações de validação de dados e preenchimento de informações padrão.

Deste modo, manterei no código a, salvo engano, equivocada implementação do padrão apenas para fins de eventual verificação/curiosidade dos Senhores, mas peço que **** a ignorem para efeitos de correção da atividade 5****.

O Padrão de Estrutura que efetivamente enviarei para correção é o Adapter, por meio da classe PostgresManager, que implementa a interface DatabaseManager (encontrado no arquivo /API/infra/database.ts).
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




**** Apenas para verificação/curiosidade! Gentileza não considerar para a correção da Atividade! ****
Implementação do Padrão de Estrutura "FACADE" de forma a facilitar a obtenção/persistência/validação de dados analíticos de um estudante em determinada atividade do Inven!RA para utilização na view/frontend de interação do AP com o estudante. 

Através da "FACADE" oculta-se do componente "View" (responsável pela criação do FrontEnd) a complexidade dos subsistemas responsáveis por armazenar/fornecer os dados.
Neste caso, é papel do componente databaseManager armazenar/fornecer esses dados, mas poderia-se utilizar também a própria API/BACKEND como intermediador desses dados, caso a View/Frontend, por exemplo, tenha de ser hospedada em outro servidor distinto do servidor que hospeda a API.
Estas implementações ficam a cargo da "FACADE", deixando a view preocupar-se apenas com a criação/obtenção de dados do frontend.
Além disso, fica a cargo da "FACADE" realizar as validações dos dados (Por exemplo, se o estudante acertou ou não a Flag enviada).*/


//Interface da Facade
interface StudentInfoFacadeInterface {
    getStudentActivity(activityID: string, InveniRAstdID: string): Promise<any>;
    setStudentActivity(activityID: string, InveniRAstdID: string, action: any): Promise<any>;
}

//Classe que implementa a interface da Facade
class StudentInfoFacade implements StudentInfoFacadeInterface {
    
    //checa o status atual dos analytics do estudante e retorna as informações relacionadas ao último estado.
    async getStudentActivity(activityID: string, InveniRAstdID: string): Promise<any>{
        //checar se estudante está ativo
        //buscar informações do estudante
        let studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});

		let acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
		let acessoInstrucoes = (studentInformation.row.replace('(',"").replace(')',"").split(",")[2].replace('t','true').replace('f','false') === 'true');
		let acessoObjetivo = (studentInformation.row.replace('(',"").replace(')',"").split(",")[3].replace('t','true').replace('f','false') === 'true');
		let acertouFlag = (studentInformation.row.replace('(',"").replace(')',"").split(",")[4].replace('t','true').replace('f','false') === 'true');
		let acessoDica1 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[5].replace('t','true').replace('f','false') === 'true');
		let acessoDica2 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[6].replace('t','true').replace('f','false') === 'true');
		let acessoDica3 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[7].replace('t','true').replace('f','false') === 'true');

        //Informações Default
        let instrucoes = "Para ler as instruções clique no botão 'Ler Instruções'";
        let objetivo = "Para ler o objetivo clique no botão 'Ler Objetivo'";
        let flag = "FLAG INCORRETA/NÃO ENCONTRADA! Digite a flag correta neste campo e clique no botão 'Enviar Flag'.";
        let dica1 = "Para visualizar a primeira dica, clique no botão 'Ler Dica 1'";
        let dica2 = "Para visualizar a segunda dica, clique no botão 'Ler Dica 2'";
        let dica3 = "Para visualizar a terceira dica, clique no botão 'Ler Dica 3'";
                
        //atualiza Analytics de "Acesso Atividade", caso seja o primeiro acesso.
        if (!acessoAtividade){
            await databaseManager.setStudentActivityAccess(activityID,InveniRAstdID);
            //studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});
            //acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
        }else {
            //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
            let informacoes = await databaseManager.getActivityDetails(activityID);
            
            if (acessoInstrucoes) {instrucoes = informacoes.instrucoesacesso;};
            if (acessoObjetivo) {objetivo = informacoes.instrucoesobjetivo;};
            if (acertouFlag) {flag = "PARABÉNS!!! A FLAG INFORMADA ESTÁ CORRETA!!!";};
            if (acessoDica1) {dica1 = informacoes.dica1;};
            if (acessoDica2) {dica2 = informacoes.dica2;};
            if (acessoDica3) {dica3 = informacoes.dica3;};
        };

        //Retornar informações PARA O FRONTEND
        return {
            "activityID":activityID,
            "InveniRAstdID":InveniRAstdID,
            "json_params":{
              "instrucoesacesso":instrucoes,
              "instrucoesobjetivo":objetivo,
              "flag":flag,
              "dica1":dica1,
              "dica2":dica2,
              "dica3":dica3,
            }
        }
    };

    //
    async setStudentActivity(activityID: string, InveniRAstdID: string, action: any): Promise<any>{
        //checar se estudante está ativo
        //buscar informações do estudante
        let studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});

		let acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
		let acessoInstrucoes = (studentInformation.row.replace('(',"").replace(')',"").split(",")[2].replace('t','true').replace('f','false') === 'true');
		let acessoObjetivo = (studentInformation.row.replace('(',"").replace(')',"").split(",")[3].replace('t','true').replace('f','false') === 'true');
		let acertouFlag = (studentInformation.row.replace('(',"").replace(')',"").split(",")[4].replace('t','true').replace('f','false') === 'true');
		let acessoDica1 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[5].replace('t','true').replace('f','false') === 'true');
		let acessoDica2 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[6].replace('t','true').replace('f','false') === 'true');
		let acessoDica3 = (studentInformation.row.replace('(',"").replace(')',"").split(",")[7].replace('t','true').replace('f','false') === 'true');

        //Informações Default
        let instrucoes = "Para ler as instruções clique no botão 'Ler Instruções'";
        let objetivo = "Para ler o objetivo clique no botão 'Ler Objetivo'";
        let flag = "FLAG INCORRETA/NÃO ENCONTRADA! Digite a flag correta neste campo e clique no botão 'Enviar Flag'.";
        let dica1 = "Para visualizar a primeira dica, clique no botão 'Ler Dica 1'";
        let dica2 = "Para visualizar a segunda dica, clique no botão 'Ler Dica 2'";
        let dica3 = "Para visualizar a terceira dica, clique no botão 'Ler Dica 3'";
                
        //atualiza Analytics de "Acesso Atividade", caso seja o primeiro acesso.
        if (!acessoAtividade){
            await databaseManager.setStudentActivityAccess(activityID,InveniRAstdID);
            //studentInformation = await databaseManager.getStudentAnalytics({"activityID":activityID,"InveniRAstdID":InveniRAstdID});
            //acessoAtividade = (studentInformation.row.replace('(',"").replace(')',"").split(",")[1].replace('t','true').replace('f','false') === 'true');
        }else {
            //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
            let informacoes = await databaseManager.getActivityDetails(activityID);

            switch (action.tipo) {
                case "instructionsBtt":
                    await databaseManager.setStudentActivityInstructions(activityID,InveniRAstdID);
                    acessoInstrucoes = true;
                    break;
                case "objectiveBtt":
                    await databaseManager.setStudentActivityObjective(activityID,InveniRAstdID);
                    acessoObjetivo = true;
                    break;
                case "enviarFlagBtt":
                    if (action.flag === informacoes.act_flag) {
                        await databaseManager.setStudentActivityFlag(activityID,InveniRAstdID,action.flag);
                        acertouFlag = true;
                    }
                    break;
                case "dica1Btt":
                    await databaseManager.setStudentActivityDica1(activityID,InveniRAstdID);
                    acessoDica1 = true;
                    break;
                case "dica2Btt":
                    await databaseManager.setStudentActivityDica2(activityID,InveniRAstdID);
                    acessoDica2 = true;
                    break;
                case "dica3Btt":
                    await databaseManager.setStudentActivityDica3(activityID,InveniRAstdID);
                    acessoDica3 = true;
                    break;
            }
            
            if (acessoInstrucoes) {instrucoes = informacoes.instrucoesacesso;};
            if (acessoObjetivo) {objetivo = informacoes.instrucoesobjetivo;};
            if (acertouFlag) {flag = "PARABÉNS!!! A FLAG INFORMADA ESTÁ CORRETA!!!";};
            if (acessoDica1) {dica1 = informacoes.dica1;};
            if (acessoDica2) {dica2 = informacoes.dica2;};
            if (acessoDica3) {dica3 = informacoes.dica3;};
        };

        //Retornar informações PARA O FRONTEND
        return {
            "activityID":activityID,
            "InveniRAstdID":InveniRAstdID,
            "json_params":{
              "instrucoesacesso":instrucoes,
              "instrucoesobjetivo":objetivo,
              "flag":flag,
              "dica1":dica1,
              "dica2":dica2,
              "dica3":dica3,
            }
        }
    };
};


module.exports = StudentInfoFacade;