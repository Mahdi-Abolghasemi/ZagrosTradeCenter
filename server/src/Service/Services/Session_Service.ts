import { Session_Model } from "../../Domain/Model/Session_Model";
import { ISession_Service } from "../IServices/ISession_Service";
import { ISession_Repository } from "../../Repository/IRepositories/ISession_Repository";
import { Session_Repository } from "../../Repository/Repositories/Session_Repository";
import { ObjectId } from "mongodb";
import { Session_Dto } from "../../Domain/Dto/Session_Dto";

export class Session_Service implements ISession_Service<Session_Model, Session_Dto> {
    private objSession: ISession_Repository<Session_Model, Session_Dto>;

    constructor() {
        this.objSession = new Session_Repository();
    }

    async Add(newSession: Session_Model): Promise<boolean> {
        let result: boolean = false;
        newSession._id = new ObjectId();
        newSession.caseId = new ObjectId(newSession.caseId);
        await this.objSession.Add(newSession).then(res => result = res);

        return result;
    }

    async GetByEmail(sessionToUser: string): Promise<Session_Dto[]> {
        let result: Session_Dto[] = [];
        await this.objSession.GetByEmail(sessionToUser).then(res => result = res);

        return result;
    }

    async Delete(id: ObjectId): Promise<boolean> {
        let result: boolean = false;
        await this.objSession.Delete(id).then(res => result = res);

        return result;
    }
}