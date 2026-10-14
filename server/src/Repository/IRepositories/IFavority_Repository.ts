export interface IFavority_Repository<T> {
    Add(newFavority: T): Promise<boolean>;
}