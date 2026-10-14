import { Request, Response, Router } from "express";
const routers: Router = require("express").Router();
import { Favority_Model } from "../Domain/Model/Favority_Model";
import { IFavority_Service } from "../Service/IServices/IFavority_Service";
import { Favority_Service } from "../Service/Services/Favority_Service";
import Authorization from "../Middlewares/Authorization_Middleware";

const objFavority: IFavority_Service<Favority_Model> = new Favority_Service();
const objAuthorization: Authorization = new Authorization();

routers.post("/add", objAuthorization.UserOnly, add);

//*********************************************************** */

async function add(req: Request, res: Response): Promise<void> {
    objFavority.Add(req.body).then(val => res.send(val));
}

export default routers;

