import { ICase_Service } from "../IServices/ICase_Service";
import { Case_Model, ResultUploadImg_Model } from "../../Domain/Model/Case_Model";
import { ICase_Repository } from "../../Repository/IRepositories/ICase_Repository";
import { Case_Repository } from "../../Repository/Repositories/Case_Repository";
import { ObjectId } from "mongodb";
import { CaseStatus_Enum } from "../../Domain/Enumration/CaseStatus_Enum";
import fs from "fs";
import path from "path";

export class Case_Service implements ICase_Service<Case_Model, ResultUploadImg_Model> {
    private objRepository: ICase_Repository<Case_Model>;

    constructor() {
        this.objRepository = new Case_Repository();
    }

    async GetAll(): Promise<Case_Model[]> {
        let result: Case_Model[] = [];
        await this.objRepository.GetAll().then(res => result = res);

        return result;
    }

    async Get(id: ObjectId): Promise<Case_Model> {
        let result: Case_Model = new Case_Model;
        await this.objRepository.Get(id).then(res => result = res);

        return result;
    }

    async GetByEmail(email: string): Promise<Case_Model[]> {
        let result: Case_Model[] = [];
        await this.objRepository.GetByEmail(email).then(res => result = res);

        return result;
    }

    async Add(newCase: Case_Model): Promise<boolean> {
        let result: boolean = false;
        newCase._id = new ObjectId();
        newCase.status = CaseStatus_Enum.Free;
        await this.objRepository.Add(newCase).then(res => result = res);

        return result;
    }

    async Edit(editCase: Case_Model): Promise<boolean> {
        let result: boolean = false;
        await this.objRepository.Edit(editCase).then(res => result = res);

        return result;
    }

    async Delete(id: ObjectId): Promise<boolean> {
        try {
            let result: boolean = false;
            let myCase: Case_Model = new Case_Model;

            await this.Get(id).then(res => myCase = res);
            if (myCase) {
                let removeRes: boolean = false;
                await this.RemoveUploadImage(myCase.picturePath).then(res => removeRes = res);

                if (removeRes) {
                    await this.objRepository.Delete(id).then(res => result = res);
                }
            }

            return result;
        }
        catch (ex: unknown) {
            console.log(`error in delete case. ${ex}`);
            return false;
        }

    }

    async UploadImage(folderName: string, file: Express.Multer.File): Promise<ResultUploadImg_Model> {
        let result: ResultUploadImg_Model = new ResultUploadImg_Model();
        try {
            const uploadDir = path.join(process.cwd(), `../client/public/uploads/cases/${folderName}`);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const extension = path.extname(file.originalname);
            const fileName = `${Date.now()}${extension}`;
            const filePath = path.join(uploadDir, fileName);

            await fs.promises.writeFile(filePath, file.buffer);
            result.success = true;
            result.imgPath = `${folderName}/${fileName}`;
            return result;
        }
        catch (ex: unknown) {
            console.log(`error in upload image. ${ex}`);
            result.success = false;
            result.imgPath = "";
            return result;
        }
    }

    async RemoveUploadImage(imgPath: string): Promise<boolean> {
        try {
            let path: string = `../client/public/uploads/cases/${imgPath}`;
            await fs.promises.unlink(path);
            return true;
        }
        catch (ex: unknown) {
            console.log(`error in remove image. ${ex}`);
            return false;
        }
    }
}