import { Register_type, AuthResult_type, Login_type, UserPassword_type } from "../types/auth_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";
import { role_enum } from "@/enumrations/role_enum";

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
        let result: AuthResult_type = <AuthResult_type>{ success: false, userName: "", token: "", role: "" };
        await this.objRDS.Registration(inputData).then(res => result = res);

        if (result.success) {
            await this.cookie.set("TOKEN", result.token, { path: "/" });
            await this.cookie.set("USER_NAME", result.userName, { path: "/" });
            await this.cookie.set("ROLE", result.role, { path: "/" });
        }

        return result.success;
    }

    async Login(inputData: Login_type): Promise<boolean> {
        let result: AuthResult_type = <AuthResult_type>{ success: false, userName: "", token: "", role: "" };
        await this.objRDS_Login.Login(inputData).then(res => result = res);

        if (result.success) {
            await this.cookie.set("TOKEN", result.token, { path: "/" });
            await this.cookie.set("USER_NAME", result.userName, { path: "/" });
            await this.cookie.set("ROLE", result.role, { path: "/" });
        }

        return result.success;
    }

    async ChangePassword(inputData: UserPassword_type): Promise<boolean> {
        const obj_RDS: restDataSource<UserPassword_type, boolean> = new restDataSource("auth");
        let result: boolean = false;
        inputData.email = await this.cookie.get("USER_NAME");
        let role: string = await this.cookie.get("ROLE");

        if (role === role_enum.Admin) {
            await obj_RDS.ChangePassword(inputData, "changeAdminPassword").then(res => result = res);
        }
        else {
            await obj_RDS.ChangePassword(inputData, "changePassword").then(res => result = res);
        }

        return result;
    }

    async EditProfile(inputData: Register_type): Promise<boolean> {
        let result: boolean = false;
        const obj_RDS: restDataSource<Register_type, boolean> = new restDataSource("auth");
        let role: string = await this.cookie.get("ROLE");

        if (role === role_enum.Admin) {
            await obj_RDS.Edit(inputData, "editAdminProfile").then(res => result = res);
        }
        else {
            await obj_RDS.Edit(inputData, "editProfile").then(res => result = res);
        }

        return result;
    }

    async GetProfile(): Promise<Register_type> {
        let result: Register_type = <Register_type>{};
        type costom = {
            email: string
        }
        let input: costom = { email: await this.cookie.get("USER_NAME") };
        let role: string = await this.cookie.get("ROLE");
        const obj_RDS: restDataSource<costom, Register_type> = new restDataSource("auth");

        if (role === role_enum.Admin) {
            await obj_RDS.Get(input, "getAdminProfile").then(res => result = res);
        }
        else {
            await obj_RDS.Get(input, "getProfile").then(res => result = res);
        }

        return result;
    }
}