import { ObjectId } from "mongodb";

export interface ICase_Service<T, U> {
    GetAll(): Promise<T[]>;
    Get(id: ObjectId): Promise<T>;
    GetByEmail(email: string): Promise<T[]>;
    Add(newCase: T): Promise<boolean>;
    Edit(editCase: T): Promise<boolean>;
    Delete(id: ObjectId): Promise<boolean>;
    UploadImage(folderName: string, file: Express.Multer.File): Promise<U>;
    RemoveUploadImage(imgPath: string): Promise<boolean>;
}