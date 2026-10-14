import { Favority_Model } from "../../Domain/Model/Favority_Model";
import { IFavority_Service } from "../IServices/IFavority_Service";
import { IFavority_Repository } from "../../Repository/IRepositories/IFavority_Repository";
import { Favority_Repository } from "../../Repository/Repositories/Favority_Repository";
import { ObjectId } from "mongodb";

export class Favority_Service implements IFavority_Service<Favority_Model> {
    private objFavority: IFavority_Repository<Favority_Model>;

    constructor() {
        this.objFavority = new Favority_Repository();
    }

    async Add(newFavority: Favority_Model): Promise<boolean> {
        let result: boolean = false;
        newFavority._id = new ObjectId();
        await this.objFavority.Add(newFavority).then(res => result = res);

        return result;
    }
}