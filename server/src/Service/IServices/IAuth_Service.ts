export interface IAuth_Services<T, U> {
    Login(userName: string, password: string): Promise<U>;
    Registration(profile: T): Promise<U>;
    GetProfile(email: string, returnType: string): Promise<T>;
    EditProfile(profile: T): Promise<boolean>;
    ChangePassword(email: string, oldPassword: string, newPassword: string): Promise<boolean>;
    ChangeAdminPassword(email: string, oldPassword: string, newPassword: string): Promise<boolean>;
    GetAdminProfile(email: string, returnType: string): Promise<T>;
    EditAdminProfile(profile: T): Promise<boolean>;
}