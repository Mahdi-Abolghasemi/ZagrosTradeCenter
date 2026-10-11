import { ObjectId } from "mongodb";

export class Case_Model {
    public _id: ObjectId;
    public title: string;
    public describe: string;
    public ownerName: string;
    public picturePath: string;
    public address: string;
    public ownerEmail: string;
    public status: string;

    constructor() {
        this._id = new ObjectId();
        this.title = "";
        this.describe = "";
        this.ownerName = "";
        this.picturePath = "";
        this.address = "";
        this.ownerEmail = "";
        this.status = "";
    }
}

export class ResultUploadImg_Model {
    public success: boolean;
    public imgPath: string;

    constructor() {
        this.success = false;
        this.imgPath = "";
    }
}