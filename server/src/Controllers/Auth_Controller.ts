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
    console.log(`login action is run. ${req.body.userName} , ${req.body.password}`);
    let result: Auth_Result = <Auth_Result>{};
    await objAuth.Login(req.body.userName, req.body.password).then(val => result = val);
    res.status(result.success ? 200 : 401).send(result);
}

async function registration(req: Request, res: Response): Promise<void> {
    let result: Auth_Result = <Auth_Result>{};
    await objAuth.Registration(req.body).then(val => result = val);
    res.status(result ? 200 : 500).send(result);
}

async function getProfile(req: Request, res: Response): Promise<void> {
    let result: Auth_Model = <Auth_Model>{};
    await objAuth.GetProfile(req.body.email).then(val => result = val);
    res.status(result ? 200 : 500).send(result);
}

async function editProfile(req: Request, res: Response): Promise<void> {
    let result: boolean = false;
    await objAuth.EditProfile(req.body).then(val => result = val);
    res.status(result ? 200 : 500).send(result);
}

async function changePassword(req: Request, res: Response): Promise<void> {
    let result: boolean = false;
    await objAuth.ChangePassword(req.body.email, req.body.oldPassword, req.body.newPassword).then(val => result = val);
    res.status(result ? 200 : 500).send(result);
}

export default routers;