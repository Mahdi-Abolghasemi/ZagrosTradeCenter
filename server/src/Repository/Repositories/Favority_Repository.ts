import { Favority_Model } from "../../Domain/Model/Favority_Model";
import { IFavority_Repository } from "../IRepositories/IFavority_Repository";
import objConnection from "../../dbConnection";

export class Favority_Repository implements IFavority_Repository<Favority_Model> {
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
}