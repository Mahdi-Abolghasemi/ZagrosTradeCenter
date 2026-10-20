import { ObjectId } from "mongodb";

export interface ISession_Repository<T, U> {
    Add(newSession: T): Promise<boolean>;
    GetByEmail(sessionToUser: string): Promise<U[]>;
    Delete(id: ObjectId): Promise<boolean>;
}