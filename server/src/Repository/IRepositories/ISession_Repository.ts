export interface ISession_Repository<T> {
    Add(newSession: T): Promise<boolean>;
}