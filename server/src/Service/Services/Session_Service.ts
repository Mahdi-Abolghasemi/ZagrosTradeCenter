import { Session_Model } from "../../Domain/Model/Session_Model";
import { ISession_Service } from "../IServices/ISession_Service";
import { ISession_Repository } from "../../Repository/IRepositories/ISession_Repository";
import { Session_Repository } from "../../Repository/Repositories/Session_Repository";
import { ObjectId } from "mongodb";

export class Session_Service implements ISession_Service<Session_Model> {
    private objSession: ISession_Repository<Session_Model>

    constructor() {
        this.objSession = new Session_Repository();
    }

    async Add(newSession: Session_Model): Promise<boolean> {
        let result: boolean = false;
        newSession._id = new ObjectId();
        await this.objSession.Add(newSession).then(res => result = res);

        return result;
    }
}