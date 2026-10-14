import { Session_Model } from "../../Domain/Model/Session_Model";
import { ISession_Repository } from "../IRepositories/ISession_Repository";
import objConnection from "../../dbConnection";

export class Session_Repository implements ISession_Repository<Session_Model> {
    async Add(newSession: Session_Model): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            myDb.collection("Session").insertOne(newSession).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in add session: ${ex}`);
            return false;
        }
    }
}