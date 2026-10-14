import { Favority_type } from "@/types/favority_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";

export class Favority_service {
    private cookie: Cookie;

    constructor() {
        this.cookie = new Cookies();
    }

    async Add(caseId: string): Promise<boolean> {
        let newFavority: Favority_type = { _id: "", caseId: "", favorityToUser: "" };
        newFavority.caseId = caseId;
        newFavority.favorityToUser = await this.cookie.get("USER_NAME");
        let result: boolean = false;

        const objRDS: restDataSource<Favority_type, boolean> = new restDataSource("favority");
        await objRDS.Add(newFavority, "add").then(res => result = res);

        return result;
    }
}