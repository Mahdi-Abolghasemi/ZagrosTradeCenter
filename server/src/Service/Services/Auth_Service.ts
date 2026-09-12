import { Request, Response, NextFunction } from "express";
import { IAuth_Services } from "../IServices/IAuth_Service";
import { Auth_Model, Auth_Result } from "../../Domain/Model/Auth_Model";
import { IAuth_Repository } from "../../Repository/IRepositories/IAuth_Repository";
import { Auth_Repository } from "../../Repository/Repositories/Auth_Repository";
const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
import { RoulType_Enum } from "../../Domain/Enumration/RoulType_Enum";
import { ReturnType_Enum } from "../../Domain/Enumration/ReturnType";

export class Auth_Service implements IAuth_Services<Auth_Model, Auth_Result> {
    private objAuth: IAuth_Repository<Auth_Model>;

    constructor() {
        this.objAuth = new Auth_Repository();
    }

    async Login(userName: string, password: string): Promise<Auth_Result> {
        let user: Auth_Model = <Auth_Model>{}
        let result: Auth_Result = new Auth_Result;
        let hashPassword: string = await createHash('sha256').update(password).digest('base64');
        await this.objAuth.Login(userName, hashPassword).then(res => user = res);

        if (user) {
            result.success = true;
            result.userName = user.email;
            let role = user.role;
            result.token = await jwt.sign({ userName, role }, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
        }

        return result;
    }

    async Registration(profile: Auth_Model): Promise<Auth_Result> {
        let repositoryResult: boolean = false;
        let result: Auth_Result = <Auth_Result>{};
        let hashPassword: string = await createHash('sha256').update(profile.password).digest('base64');
        profile.password = hashPassword;
        profile.role = RoulType_Enum.User;

        let user: Auth_Model = <Auth_Model>{};
        await this.GetProfile(profile.email, ReturnType_Enum.CustomData).then(res => user = res);

        if (!user) {
            await this.objAuth.Registration(profile).then(res => repositoryResult = res);

            if (repositoryResult) {
                result.success = repositoryResult;
                result.userName = profile.email;
                let userName: string = profile.email;
                let role: string = profile.role;
                result.token = await jwt.sign({ userName, role }, process.env.JWT_SECRET_KEY, { expiresIn: "1hr" });
            }
        }

        return result;
    }

    async GetProfile(email: string, returnType: string): Promise<Auth_Model> {
        let user: Auth_Model = <Auth_Model>{};
        await this.objAuth.GetProfile(email, returnType).then(res => user = res);

        return user;
    }

    async EditProfile(profile: Auth_Model): Promise<boolean> {
        let result: boolean = false;
        await this.objAuth.EditProfile(profile).then(res => result = res);

        return result;
    }

    async ChangePassword(email: string, oldPassword: string, newPassword: string): Promise<boolean> {
        let result: boolean = false;
        let user: Auth_Model = <Auth_Model>{};
        await this.GetProfile(email, ReturnType_Enum.FullData).then(res => user = res);

        let hashOldPassword: string = await createHash('sha256').update(oldPassword).digest('base64');

        if (user.password === hashOldPassword) {
            let hashNewPassword: string = await createHash('sha256').update(newPassword).digest('base64');
            await this.objAuth.ChangePassword(email, hashNewPassword).then(res => result = res);
        }

        return result;
    }

    UserOnly(req: Request, res: Response, next: NextFunction): void {
        let token: string | undefined = req.headers.authorization;

        if (!token) {
            res.status(401).send("Token missing.");
        }

        try {
            let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === RoulType_Enum.User) {
                next();
            }
            else {
                res.status(403).send("Access denied");
            }
        }
        catch (ex: unknown) {
            res.status(403).send("Invalid or expired token");
        }
    }
}