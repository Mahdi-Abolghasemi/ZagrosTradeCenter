import { Session_type } from "@/types/session_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";

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
}