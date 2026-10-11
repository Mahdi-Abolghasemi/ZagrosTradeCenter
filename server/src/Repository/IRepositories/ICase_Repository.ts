import { ObjectId } from "mongodb";

export interface ICase_Repository<T> {
    GetAll(): Promise<T[]>;
    Get(id: ObjectId): Promise<T>;
    GetByEmail(email: string): Promise<T[]>;
    Add(newCase: T): Promise<boolean>;
    Edit(editCase: T): Promise<boolean>;
    Delete(id: ObjectId): Promise<boolean>;
}