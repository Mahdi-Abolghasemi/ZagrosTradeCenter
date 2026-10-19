import { Favority_Model } from "../../Domain/Model/Favority_Model";
import { IFavority_Service } from "../IServices/IFavority_Service";
import { IFavority_Repository } from "../../Repository/IRepositories/IFavority_Repository";
import { Favority_Repository } from "../../Repository/Repositories/Favority_Repository";
import { ObjectId } from "mongodb";
import { Favority_Dto } from "../../Domain/Dto/Favority_Dto";

export class Favority_Service implements IFavority_Service<Favority_Model, Favority_Dto> {
    private objFavority: IFavority_Repository<Favority_Model, Favority_Dto>;

    constructor() {
        this.objFavority = new Favority_Repository();
    }

    async Add(newFavority: Favority_Model): Promise<boolean> {
        let result: boolean = false;
        newFavority._id = new ObjectId();
        newFavority.caseId = new ObjectId(newFavority.caseId);
        await this.objFavority.Add(newFavority).then(res => result = res);

        return result;
    }

    async getByEmail(favorityToUser: string): Promise<Favority_Dto[]> {
        let result: Favority_Dto[] = [];
        await this.objFavority.getByEmail(favorityToUser).then(res => result = res);

        return result;
    }

    async Delete(id: ObjectId): Promise<boolean> {
        let result: boolean = false;
        await this.objFavority.Delete(id).then(res => result = res);

        return result;
    }
}