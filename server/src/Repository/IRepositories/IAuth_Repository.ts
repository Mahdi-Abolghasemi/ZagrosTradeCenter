export interface IAuth_Repository<T> {
    Login(userName: string, hashPassword: string): Promise<T>;
    Registration(profile: T): Promise<boolean>;
    GetProfile(email: string, returnType: string): Promise<T>;
    EditProfile(profile: T): Promise<boolean>;
    ChangePassword(email: string, hashNewPass: string): Promise<boolean>;
    ChangeAdminPassword(email: string, hashNewPass: string): Promise<boolean>;
    GetAdminProfile(email: string, returnType: string): Promise<T>;
    EditAdminProfile(profile: T): Promise<boolean>;
}