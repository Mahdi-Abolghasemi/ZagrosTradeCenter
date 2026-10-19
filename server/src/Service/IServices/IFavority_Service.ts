import { ObjectId } from "mongodb";

export interface IFavority_Service<T, U> {
    Add(newFavority: T): Promise<boolean>;
    getByEmail(favorityToUser: string): Promise<U[]>;
    Delete(id: ObjectId): Promise<boolean>;
}