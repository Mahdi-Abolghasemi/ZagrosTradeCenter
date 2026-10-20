import { Session_type } from "@/types/session_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";
import { Session_dto } from "@/types/session_type";

export class Session_service {
    private cookie: Cookie;

    constructor() {
        this.cookie = new Cookies();
    }

    async Add(caseId: string): Promise<boolean> {
        let newSession: Session_type = { _id: "", caseId: "", sessionToUser: "" };
        newSession.caseId = caseId;
        newSession.sessionToUser = await this.cookie.get("USER_NAME");
        let result: boolean = false;

        const objRDS: restDataSource<Session_type, boolean> = new restDataSource("session");
        await objRDS.Add(newSession, "add").then(res => result = res);

        return result;
    }

    async GetByEmail(): Promise<Session_dto[]> {
        let result: Session_dto[] = [];
        type inputValue = {
            sessionToUser: string
        }

        let input: inputValue = { sessionToUser: await this.cookie.get("USER_NAME") };
        const objRDS: restDataSource<inputValue, Session_dto[]> = new restDataSource("session");
        await objRDS.GetByEmail(input, "getByEmail").then(res => result = res);

        return result;
    }

    async Delete(_id: string): Promise<boolean> {
        let result: boolean = false;
        type inputData = {
            id: string
        }
        let itemId: inputData = { id: _id };
        const objRDS: restDataSource<inputData, boolean> = new restDataSource("session");
        await objRDS.Delete(itemId, "delete").then(res => result = res);

        return result;
    }
}