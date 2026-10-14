import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { Session_Model } from "../Domain/Model/Session_Model";
import { ISession_Service } from "../Service/IServices/ISession_Service";
import { Session_Service } from "../Service/Services/Session_Service";
import Authorization from "../Middlewares/Authorization_Middleware";

const objSession_Service: ISession_Service<Session_Model> = new Session_Service();
const objAuthorization: Authorization = new Authorization();

routers.post("/add", objAuthorization.UserOnly, add);

//************************************************************ */

async function add(req: Request, res: Response): Promise<void> {
    objSession_Service.Add(req.body).then(val => res.send(val));
}

export default routers;