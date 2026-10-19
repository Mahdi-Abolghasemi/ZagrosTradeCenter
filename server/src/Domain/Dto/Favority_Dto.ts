import { ObjectId } from "mongodb";
import { Case_Model } from "../Model/Case_Model";


export class Favority_Dto {
    public _id: ObjectId;
    public caseId: ObjectId;
    public favorityToUser: string;
    public caseDetails: Case_Model;

    constructor() {
        this._id = new ObjectId();
        this.caseId = new ObjectId();
        this.favorityToUser = "";
        this.caseDetails = <Case_Model>{};
    }
}