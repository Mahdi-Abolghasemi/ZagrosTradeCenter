export interface ISession_Service<T> {
    Add(newSession: T): Promise<boolean>;
}