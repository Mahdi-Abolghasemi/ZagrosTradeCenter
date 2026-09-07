import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { IAuth_Services } from "../Service/IServices/IAuth_Service";
import { Auth_Service } from "../Service/Services/Auth_Service";
import { Auth_Model, Auth_Result } from "../Domain/Model/Auth_Model";

const objAuth: IAuth_Services<Auth_Model, Auth_Result> = new Auth_Service();

routers.post("/logIn", logIn);
routers.post("/registration", registration);
routers.post("/getProfile", objAuth.UserOnly, getProfile);
routers.put("/editProfile", objAuth.UserOnly, editProfile);
routers.put("/changePassword", objAuth.UserOnly, changePassword);

//******************************************************************* */

async function logIn(req: Request, res: Response): Promise<void> {
    await objAuth.Login(req.body.userName, req.body.password).then(val => res.send(val));
}

async function registration(req: Request, res: Response): Promise<void> {
    await objAuth.Registration(req.body).then(val => res.send(val));
}

async function getProfile(req: Request, res: Response): Promise<void> {
    await objAuth.GetProfile(req.body.email).then(val => res.send(val));
}

async function editProfile(req: Request, res: Response): Promise<void> {
    await objAuth.EditProfile(req.body).then(val => res.send(val));
}

async function changePassword(req: Request, res: Response): Promise<void> {
    await objAuth.ChangePassword(req.body.email, req.body.oldPassword, req.body.newPassword).then(val => res.send(val));
}

export default routers;