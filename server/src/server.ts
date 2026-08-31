import express = require("express");
import { Express } from "express";
require('dotenv').config();
const bodyParser = require("body-parser");
import objConnection from "./dbConnection";
const cors = require('cors');


async function start() {
    try {
        await objConnection.Connection();

        const corsOptions = {
            origin: `${process.env.FRONTEND_ADDRESS}`,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: [
                "Content-Type",
                "Authorization",
            ]
        };

        const server: Express = express();
        server.use(cors(corsOptions));
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(bodyParser.json());


        server.listen(process.env.SERVER_PORT, (): void => {
            console.log(
                `Server started on http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}; ` + `press Ctrl + C to trminate.`,
            );
        });
    }
    catch (ex: unknown) {
        console.error("Error in start server. ", ex);
    }
}

start();

