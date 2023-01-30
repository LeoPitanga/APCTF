//Receiver do padrão Command
const databaseManager = require('../../API/data/DBManager');

//Interface da Facade
interface StudentInfoFacadeInterface {
    getStudentActivity(activityID: string, InveniRAstdID: string): Promise<any>;
    setStudentActivity(activityID: string, InveniRAstdID: string, action: any): Promise<any>;
}

//Interface para implementação do padrão Command. A ser implementada pelas classes concretas contendo os comandos de comunicação com o Backend.
interface BackendCommand {
    execute(): Promise<any>;
}

//Invoker do padrão Command
class CommandInvoker {
    private currentCommand: BackendCommand;

    constructor (command: BackendCommand) {
        this.currentCommand = command;
    }
    
    setCommand(command: BackendCommand) {
        this.currentCommand = command;
    }

    async executeCommand() {
        return await this.currentCommand.execute();
    }
}

//Comando que checa o status atual dos analytics do estudante e retorna as informações relacionadas ao último estado através de comunicação direta com o DatabaseManager.
class GetStudentActivityCommand implements BackendCommand {
    private backendCommandReceiver: any;
    private activityID: string;
    private InveniRAstdID: string;

    constructor(receiver: any, activityID: string, InveniRAstdID: string) {
        this.backendCommandReceiver = receiver;
        this.activityID = activityID;
        this.InveniRAstdID = InveniRAstdID;
    }
    async execute(): Promise<any> {
        //checar se estudante está ativo
        //buscar informações do estudante
        let studentInformation = await this.backendCommandReceiver.getStudentAnalytics({"activityID":this.activityID,"InveniRAstdID":this.InveniRAstdID});

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
            await this.backendCommandReceiver.setStudentActivityAccess(this.activityID,this.InveniRAstdID);
        }else {
            //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
            let informacoes = await this.backendCommandReceiver.getActivityDetails(this.activityID);
            
            if (acessoInstrucoes) {instrucoes = informacoes.instrucoesacesso;};
            if (acessoObjetivo) {objetivo = informacoes.instrucoesobjetivo;};
            if (acertouFlag) {flag = "PARABÉNS!!! A FLAG INFORMADA ESTÁ CORRETA!!!";};
            if (acessoDica1) {dica1 = informacoes.dica1;};
            if (acessoDica2) {dica2 = informacoes.dica2;};
            if (acessoDica3) {dica3 = informacoes.dica3;};
        };

        //Retornar informações para o Cliente
        return {
            "activityID":this.activityID,
            "InveniRAstdID":this.InveniRAstdID,
            "json_params":{
              "instrucoesacesso":instrucoes,
              "instrucoesobjetivo":objetivo,
              "flag":flag,
              "dica1":dica1,
              "dica2":dica2,
              "dica3":dica3,
            }
        }
    }
}

//Comando que checa e atualiza o status atual do estudante e retorna as informações atualizadas através de comunicação direta com o DatabaseManager.
class SetStudentActivityCommand implements BackendCommand {
    private backendCommandReceiver: any;
    private activityID: string;
    private InveniRAstdID: string;
    private action: any;

    constructor(receiver: any, activityID: string, InveniRAstdID: string, action: any) {
        this.backendCommandReceiver = receiver;
        this.activityID = activityID;
        this.InveniRAstdID = InveniRAstdID;
        this.action = action;
    }
    async execute(): Promise<any> {
        //checar se estudante está ativo
        //buscar informações do estudante
        let studentInformation = await this.backendCommandReceiver.getStudentAnalytics({"activityID":this.activityID,"InveniRAstdID":this.InveniRAstdID});

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
            await this.backendCommandReceiver.setStudentActivityAccess(this.activityID,this.InveniRAstdID);
        }else {
            //buscar informações da atividade, a depender das informações do estudante (se já visualizou as informações e/ou se já acertou a flag)
            let informacoes = await this.backendCommandReceiver.getActivityDetails(this.activityID);

            switch (this.action.tipo) {
                case "instructionsBtt":
                    await this.backendCommandReceiver.setStudentActivityInstructions(this.activityID,this.InveniRAstdID);
                    acessoInstrucoes = true;
                    break;
                case "objectiveBtt":
                    await this.backendCommandReceiver.setStudentActivityObjective(this.activityID,this.InveniRAstdID);
                    acessoObjetivo = true;
                    break;
                case "enviarFlagBtt":
                    if (this.action.flag === informacoes.act_flag) {
                        await this.backendCommandReceiver.setStudentActivityFlag(this.activityID,this.InveniRAstdID,this.action.flag);
                        acertouFlag = true;
                    }
                    break;
                case "dica1Btt":
                    await this.backendCommandReceiver.setStudentActivityDica1(this.activityID,this.InveniRAstdID);
                    acessoDica1 = true;
                    break;
                case "dica2Btt":
                    await this.backendCommandReceiver.setStudentActivityDica2(this.activityID,this.InveniRAstdID);
                    acessoDica2 = true;
                    break;
                case "dica3Btt":
                    await this.backendCommandReceiver.setStudentActivityDica3(this.activityID,this.InveniRAstdID);
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
            "activityID":this.activityID,
            "InveniRAstdID":this.InveniRAstdID,
            "json_params":{
              "instrucoesacesso":instrucoes,
              "instrucoesobjetivo":objetivo,
              "flag":flag,
              "dica1":dica1,
              "dica2":dica2,
              "dica3":dica3,
            }
        }
    }
}

//Classe que implementa a interface da Facade e é o client do Padrão Command
class StudentInfoFacade implements StudentInfoFacadeInterface {
    //Invoker. Iniciado com command inútil apenas por ser obrigado...
    private commandInvoker = new CommandInvoker(new GetStudentActivityCommand(databaseManager, "1","1"));

    async getStudentActivity(activityID: string, InveniRAstdID: string): Promise<any> {
        this.commandInvoker.setCommand(new GetStudentActivityCommand(databaseManager,activityID,InveniRAstdID));
        return this.commandInvoker.executeCommand();
    }

    async setStudentActivity(activityID: string, InveniRAstdID: string, action: any): Promise<any> {
        this.commandInvoker.setCommand(new SetStudentActivityCommand(databaseManager,activityID,InveniRAstdID,action));
        return this.commandInvoker.executeCommand();
    }
}

module.exports = new StudentInfoFacade();