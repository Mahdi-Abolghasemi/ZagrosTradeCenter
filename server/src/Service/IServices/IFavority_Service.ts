export interface IFavority_Service<T> {
    Add(newFavority: T): Promise<boolean>;
}