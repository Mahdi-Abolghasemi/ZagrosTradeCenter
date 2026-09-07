import { Register_type, AuthResult_type, Login_type } from "../types/auth_type";
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
        }

        return result.success;
    }

    async Login(inputData: Login_type): Promise<boolean> {
        let result: AuthResult_type = <AuthResult_type>{ success: false, userName: "", token: "" };
        await this.objRDS_Login.Login(inputData).then(res => result = res);

        if (result.success) {
            await this.cookie.set("TOKEN", result.token, { path: "/" });
        }

        return result.success;
    }
}