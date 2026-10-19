import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { Favority_Model } from "../Domain/Model/Favority_Model";
import { IFavority_Service } from "../Service/IServices/IFavority_Service";
import { Favority_Service } from "../Service/Services/Favority_Service";
import Authorization from "../Middlewares/Authorization_Middleware";
import { Favority_Dto } from "../Domain/Dto/Favority_Dto";

const objFavority: IFavority_Service<Favority_Model, Favority_Dto> = new Favority_Service();
const objAuthorization: Authorization = new Authorization();

routers.post("/add", objAuthorization.UserOnly, add);
routers.post("/getByEmail", objAuthorization.UserOnly, getByEmail);
routers.post("/delete", objAuthorization.UserOnly, deleted);

//*********************************************************** */

async function add(req: Request, res: Response): Promise<void> {
    objFavority.Add(req.body).then(val => res.send(val));
}

async function getByEmail(req: Request, res: Response): Promise<void> {
    await objFavority.getByEmail(req.body.favorityToUser).then(val => res.send(val));
}

async function deleted(req: Request, res: Response): Promise<void> {
    await objFavority.Delete(req.body.id).then(val => res.send(val));
}

export default routers;

