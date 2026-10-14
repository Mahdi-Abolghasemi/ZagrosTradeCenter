import { ObjectId } from "mongodb";

export class Session_Model {
    public _id: ObjectId;
    public caseId: ObjectId;
    public sessionToUser: string;

    constructor() {
        this._id = new ObjectId();
        this.caseId = new ObjectId();
        this.sessionToUser = "";
    }
}