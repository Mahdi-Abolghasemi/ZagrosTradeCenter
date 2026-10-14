import { Router } from "express";
const routers: Router = require("express").Router();
import Auth_Controller from "./Controllers/Auth_Controller";
import Case_Controller from "./Controllers/Case_Controller";
import Favority_Controller from "./Controllers/Favority_Controller";
import Session_Controller from "./Controllers/Session_Controller";


routers.use("/auth", Auth_Controller);
routers.use("/case", Case_Controller);
routers.use("/favority", Favority_Controller);
routers.use("/session", Session_Controller);

export default routers;