import { Case_type, resultUploadImg } from "@/types/case_type";
import { restDataSource } from "./restDataSource";
import Cookies, { Cookie } from "universal-cookie";

export class Case_service {
    private cookie: Cookie;

    constructor() {
        this.cookie = new Cookies();
    }

    async Get(_id: string): Promise<Case_type> {
        let result: Case_type = <Case_type>{}
        type inputValue = {
            id: string
        }

        let input: inputValue = { id: _id };
        const objRDS: restDataSource<inputValue, Case_type> = new restDataSource("case");
        await objRDS.Get(input, "get").then(res => result = res);

        return result;
    }

    async GetByEmail(): Promise<Case_type[]> {
        let result: Case_type[] = [];
        type inputValue = {
            email: string
        }

        let input: inputValue = { email: await this.cookie.get("USER_NAME") };
        const objRDS: restDataSource<inputValue, Case_type[]> = new restDataSource("case");
        await objRDS.GetByEmail(input, "getByEmail").then(res => result = res);

        return result;
    }

    async Add(inputValue: Case_type): Promise<boolean> {
        inputValue.ownerEmail = await this.cookie.get("USER_NAME");
        let result: boolean = false;
        const objRDS: restDataSource<Case_type, boolean> = new restDataSource("case");
        await objRDS.Add(inputValue, "add").then(res => result = res);

        return result;
    }

    async UploadImage(_selectFile: File): Promise<resultUploadImg> {
        const fileData = new FormData();
        fileData.append("fileUpload", _selectFile);
        fileData.append("folderName", await this.cookie.get("USER_NAME"));

        const objRDS: restDataSource<FormData, resultUploadImg> = new restDataSource("case");
        let result: resultUploadImg = { success: false, imgPath: "" };
        await objRDS.UploadImage(fileData, "uploadImage").then(res => result = res);

        return result;
    }

    async RemoveUploadFile(imgPath: string): Promise<boolean> {
        let result: boolean = false;
        type inputData = {
            path: string
        }

        let myPath: inputData = { path: imgPath };
        const objRDS: restDataSource<inputData, boolean> = new restDataSource("case");
        await objRDS.RemoveUploadFile(myPath, "removeUploadImage").then(res => result = res);

        return result;
    }

    async Delete(_id: string): Promise<boolean> {
        let result: boolean = false;
        type inputData = {
            id: string
        }
        let itemId: inputData = { id: _id };
        const objRDS: restDataSource<inputData, boolean> = new restDataSource("case");
        await objRDS.Delete(itemId, "delete").then(res => result = res);

        return result;
    }

    async Edit(inputValue: Case_type): Promise<boolean> {
        let result: boolean = false;
        const objRDS: restDataSource<Case_type, boolean> = new restDataSource("case");
        await objRDS.Edit(inputValue, "edit").then(res => result = res);

        return result;
    }
}