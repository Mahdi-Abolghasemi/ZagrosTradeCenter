import { Case_Model } from "../../Domain/Model/Case_Model";
import { ICase_Repository } from "../IRepositories/ICase_Repository";
import objConnection from "../../dbConnection";
import { ObjectId } from "mongodb";

export class Case_Repository implements ICase_Repository<Case_Model> {
    async GetAll(): Promise<Case_Model[]> {
        try {
            const myDb = objConnection.GetDb();
            let result: Case_Model[] = await myDb.collection("Cases").find<Case_Model>({}).toArray();

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get all cases. ${ex}`);
            return [];
        }
    }

    async Get(id: ObjectId): Promise<Case_Model> {
        try {
            let result: Case_Model = new Case_Model;
            const myDb = objConnection.GetDb();
            await myDb.collection("Cases").findOne<Case_Model>({ "_id": new ObjectId(id) }).then(res => result = <Case_Model>res);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get case. ${ex}`);
            return <Case_Model>{};
        }
    }

    async GetByEmail(email: string): Promise<Case_Model[]> {
        try {
            const myDb = objConnection.GetDb();
            let result: Case_Model[] = await myDb.collection("Cases").find<Case_Model>({ "ownerEmail": email }).toArray();

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get by email for cases. ${ex}`);
            return [];
        }
    }

    async Add(newCase: Case_Model): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            await myDb.collection("Cases").insertOne(newCase).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in add new case. ${ex}`);
            return false;
        }
    }

    async Edit(editCase: Case_Model): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            editCase._id = new ObjectId(editCase._id);
            await myDb.collection("Cases").replaceOne({ "_id": new ObjectId(editCase._id) }, editCase).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in edit case. ${ex}`);
            return false;
        }
    }

    async Delete(id: ObjectId): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            await myDb.collection("Cases").deleteOne({ "_id": new ObjectId(id) }).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in delete case. ${ex}`);
            return false;
        }
    }
}