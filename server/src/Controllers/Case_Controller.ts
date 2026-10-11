import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { ICase_Service } from "../Service/IServices/ICase_Service";
import { Case_Service } from "../Service/Services/Case_Service";
import { Case_Model, ResultUploadImg_Model } from "../Domain/Model/Case_Model";
import Authorization from "../Middlewares/Authorization_Middleware";
import { upload } from "../Middlewares/Upload_Middleware";

const objCase: ICase_Service<Case_Model, ResultUploadImg_Model> = new Case_Service();
const objAuthorization: Authorization = new Authorization();

routers.get("/getAll", getAll);
routers.post("/get", objAuthorization.UserOnly, get);
routers.post("/getByEmail", objAuthorization.UserOnly, getByEmail);
routers.post("/add", objAuthorization.UserOnly, add);
routers.put("/edit", objAuthorization.UserOnly, edit);
routers.post("/delete", objAuthorization.UserOnly, deleted);
routers.post("/uploadImage", objAuthorization.UserOnly, upload.single("fileUpload"), uploadImage);
routers.post("/removeUploadImage", objAuthorization.UserOnly, removeUploadImage);

//********************************************************** */

async function getAll(req: Request, res: Response): Promise<void> {
    await objCase.GetAll().then(val => res.send(val));
}

async function get(req: Request, res: Response): Promise<void> {
    await objCase.Get(req.body.id).then(val => res.send(val));
}

async function getByEmail(req: Request, res: Response): Promise<void> {
    await objCase.GetByEmail(req.body.email).then(val => res.send(val));
}

async function add(req: Request, res: Response): Promise<void> {
    await objCase.Add(req.body).then(val => res.send(val));
}

async function edit(req: Request, res: Response): Promise<void> {
    await objCase.Edit(req.body).then(val => res.send(val));
}

async function deleted(req: Request, res: Response): Promise<void> {
    await objCase.Delete(req.body.id).then(val => res.send(val));
}

async function uploadImage(req: Request, res: Response): Promise<void> {
    let result: ResultUploadImg_Model = new ResultUploadImg_Model();
    if (req.file) {
        await objCase.UploadImage(req.body.folderName, req.file).then(val => result = val);
        res.send(result);
    }
    else {
        res.send(result);
    }
}

async function removeUploadImage(req: Request, res: Response): Promise<void> {
    await objCase.RemoveUploadImage(req.body.path).then(val => res.send(val));
}

export default routers;