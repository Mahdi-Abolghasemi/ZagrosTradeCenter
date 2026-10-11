import { Router } from "express";
const routers: Router = require("express").Router();
import Auth_Controller from "./Controllers/Auth_Controller";
import Case_Controller from "./Controllers/Case_Controller";


routers.use("/auth", Auth_Controller);
routers.use("/case", Case_Controller);

export default routers;