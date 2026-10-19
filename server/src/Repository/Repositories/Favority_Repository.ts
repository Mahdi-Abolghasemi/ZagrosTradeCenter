import { Favority_Model } from "../../Domain/Model/Favority_Model";
import { Favority_Dto } from "../../Domain/Dto/Favority_Dto";
import { IFavority_Repository } from "../IRepositories/IFavority_Repository";
import objConnection from "../../dbConnection";
import { ObjectId } from "mongodb";

export class Favority_Repository implements IFavority_Repository<Favority_Model, Favority_Dto> {
    async Add(newFavority: Favority_Model): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            myDb.collection("Favority").insertOne(newFavority).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in add favority: ${ex}`);
            return false;
        }
    }

    async getByEmail(favorityToUser: string): Promise<Favority_Dto[]> {
        try {
            const myDb = objConnection.GetDb();
            let result: Favority_Dto[] = <Favority_Dto[]>await myDb.collection("Favority").aggregate([{ $match: { "favorityToUser": favorityToUser } }, { $lookup: { from: "Cases", localField: "caseId", foreignField: "_id", as: "caseDetails" } }]).toArray();

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in get all favority: ${ex}`);
            return [];
        }
    }

    async Delete(id: ObjectId): Promise<boolean> {
        try {
            let result: boolean = false;
            const myDb = objConnection.GetDb();
            await myDb.collection("Favority").deleteOne({ "_id": new ObjectId(id) }).then(res => result = res.acknowledged);

            return result;
        }
        catch (ex: unknown) {
            console.error(`error in delete favority: ${ex}`);
            return false;
        }
    }
}