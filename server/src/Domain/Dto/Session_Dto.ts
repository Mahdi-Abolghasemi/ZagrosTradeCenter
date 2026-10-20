import { ObjectId } from "mongodb";
import { Case_Model } from "../Model/Case_Model";

export class Session_Dto {
    public _id: ObjectId;
    public caseId: ObjectId;
    public sessionToUser: string;
    public caseDetails: Case_Model;

    constructor() {
        this._id = new ObjectId();
        this.caseId = new ObjectId();
        this.sessionToUser = "";
        this.caseDetails = <Case_Model>{};
    }
}