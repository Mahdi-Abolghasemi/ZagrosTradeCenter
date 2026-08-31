import { Router } from "express";
const routers: Router = require("express").Router();
import Auth_Controller from "./Controllers/Auth_Controller";


routers.use("/auth", Auth_Controller);

export default routers;