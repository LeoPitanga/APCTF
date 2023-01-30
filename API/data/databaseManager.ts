//Abstract Product - Interface. Padrão Factory Method
//PADRÃO DE ESTRUTURA ADAPTER - Client Interface - Interface de comunicação de bancos de dados com o código Client (API). Por meio do padrão Adapter, classes que implementem esta interface serão Adaptadores para comunicação com os serviços de banco de dados com a API (cliente).
export interface DatabaseManager {

	initiateDB():any;
	saveActivity (activity: any): any;
	getActivityDetails (activity: any): any;
	saveStudent (activityStudent: any): any;
	getStudentAnalytics (activityStudent: any): any;
	updateActivity (activityID: any, activityStudent: any): any;
	getAnalytics(activityID: any): any;
	saveAnalytics(analytics: any): any;
	setStudentActivityAccess(activityID: any, activityStudent: any): any;
	setStudentActivityInstructions (activityID: any, InveniRAstdID: any): any;
	setStudentActivityObjective (activityID: any, InveniRAstdID: any): any;
	setStudentActivityFlag (activityID: any, InveniRAstdID: any, flag: any): any;
	setStudentActivityDica1 (activityID: any, InveniRAstdID: any): any;
	setStudentActivityDica2 (activityID: any, InveniRAstdID: any): any;
	setStudentActivityDica3 (activityID: any, InveniRAstdID: any): any;
}