import { Favority_type } from "@/types/favority_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";
import { Favority_dto } from "@/types/favority_type";

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

    async GetByEmail(): Promise<Favority_dto[]> {
        let result: Favority_dto[] = [];
        type inputValue = {
            favorityToUser: string
        }

        let input: inputValue = { favorityToUser: await this.cookie.get("USER_NAME") };
        const objRDS: restDataSource<inputValue, Favority_dto[]> = new restDataSource("favority");
        await objRDS.GetByEmail(input, "getByEmail").then(res => result = res);

        return result;
    }

    async Delete(_id: string): Promise<boolean> {
        let result: boolean = false;
        type inputData = {
            id: string
        }
        let itemId: inputData = { id: _id };
        const objRDS: restDataSource<inputData, boolean> = new restDataSource("favority");
        await objRDS.Delete(itemId, "delete").then(res => result = res);

        return result;
    }
}