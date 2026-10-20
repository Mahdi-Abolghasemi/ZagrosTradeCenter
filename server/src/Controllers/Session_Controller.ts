import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { Session_Model } from "../Domain/Model/Session_Model";
import { ISession_Service } from "../Service/IServices/ISession_Service";
import { Session_Service } from "../Service/Services/Session_Service";
import Authorization from "../Middlewares/Authorization_Middleware";
import { Session_Dto } from "../Domain/Dto/Session_Dto";

const objSession_Service: ISession_Service<Session_Model, Session_Dto> = new Session_Service();
const objAuthorization: Authorization = new Authorization();

routers.post("/add", objAuthorization.UserOnly, add);
routers.post("/getByEmail", objAuthorization.UserOnly, getByEmail);
routers.post("/delete", objAuthorization.UserOnly, deleted);

//************************************************************ */

async function add(req: Request, res: Response): Promise<void> {
    await objSession_Service.Add(req.body).then(val => res.send(val));
}

async function getByEmail(req: Request, res: Response): Promise<void> {
    await objSession_Service.GetByEmail(req.body.sessionToUser).then(val => res.send(val));
}

async function deleted(req: Request, res: Response): Promise<void> {
    await objSession_Service.Delete(req.body.id).then(val => res.send(val));
}

export default routers;