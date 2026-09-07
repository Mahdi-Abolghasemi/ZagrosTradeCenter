import { Request, Response, NextFunction } from "express";

export interface IAuth_Services<T, U> {
    Login(userName: string, password: string): Promise<U>;
    Registration(profile: T): Promise<U>;
    GetProfile(email: string): Promise<T>;
    EditProfile(profile: T): Promise<boolean>;
    ChangePassword(email: string, oldPassword: string, newPassword: string): Promise<boolean>;
    UserOnly(req: Request, res: Response, next: NextFunction): void;
}