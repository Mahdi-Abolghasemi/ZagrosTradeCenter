import { Register_type, AuthResult_type, Login_type, UserPassword_type } from "../types/auth_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";

export class Auth_service {
    private objRDS: restDataSource<Register_type, AuthResult_type>;
    private objRDS_Login: restDataSource<Login_type, AuthResult_type>;
    private cookie: Cookie;

    constructor() {
        this.objRDS = new restDataSource("auth");
        this.objRDS_Login = new restDataSource("auth");
        this.cookie = new Cookies();
    }

    async Register(inputData: Register_type): Promise<boolean> {
        let result: AuthResult_type = <AuthResult_type>{ success: false, userName: "", token: "" };
        await this.objRDS.Registration(inputData).then(res => result = res);

        if (result.success) {
            await this.cookie.set("TOKEN", result.token, { path: "/" });
            await this.cookie.set("USER_NAME", result.userName, { path: "/" });
        }

        return result.success;
    }

    async Login(inputData: Login_type): Promise<boolean> {
        let result: AuthResult_type = <AuthResult_type>{ success: false, userName: "", token: "" };
        await this.objRDS_Login.Login(inputData).then(res => result = res);

        if (result.success) {
            await this.cookie.set("TOKEN", result.token, { path: "/" });
            await this.cookie.set("USER_NAME", result.userName, { path: "/" });
        }

        return result.success;
    }

    async ChangePassword(inputData: UserPassword_type): Promise<boolean> {
        const obj_RDS: restDataSource<UserPassword_type, boolean> = new restDataSource("auth");
        let result: boolean = false;
        inputData.email = await this.cookie.get("USER_NAME");
        await obj_RDS.ChangePassword(inputData).then(res => result = res);

        return result;
    }

    async EditProfile(inputData: Register_type): Promise<boolean> {
        let result: boolean = false;
        const obj_RDS: restDataSource<Register_type, boolean> = new restDataSource("auth");
        await obj_RDS.Edit(inputData).then(res => result = res);

        return result;
    }

    async GetProfile(): Promise<Register_type> {
        let result: Register_type = <Register_type>{};
        let email: string = await this.cookie.get("USER_NAME");
        const obj_RDS: restDataSource<string, Register_type> = new restDataSource("auth");
        await obj_RDS.Get(email).then(res => result = res);

        return result;
    }
}