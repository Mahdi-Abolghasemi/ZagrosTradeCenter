import { ObjectId } from "mongodb";

export class Favority_Model {
    public _id: ObjectId;
    public caseId: ObjectId;
    public favorityToUser: string;

    constructor() {
        this._id = new ObjectId();
        this.caseId = new ObjectId();
        this.favorityToUser = "";
    }
}