import { Session_Model } from "../../Domain/Model/Session_Model";
import { ISession_Repository } from "../IRepositories/ISession_Repository";
import objConnection from "../../dbConnection";
import { Session_Dto } from "../../Domain/Dto/Session_Dto";
import { ObjectId } from "mongodb";

export class Session_Repository implements ISession_Repository<Session_Model, Session_Dto> {
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

    async GetByEmail(sessionToUser: string): Promise<Session_Dto[]> {
        try {
            const myDb = objConnection.GetDb();
            let result: Session_Dto[] = <Session_Dto[]>await myDb.collection("Session").aggregate([{ $match: { "sessionToUser": sessionToUser } }, { $lookup: { from: "Cases", localField: "caseId", foreignField: "_id", as: "caseDetails" } }]).toArray();

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get by email my sessions: ${ex}`);
            return [];
        }
    }

    async Delete(id: ObjectId): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            await myDb.collection("Session").deleteOne({ "_id": new ObjectId(id) }).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in delete session: ${ex}`);
            return false;
        }
    }
}