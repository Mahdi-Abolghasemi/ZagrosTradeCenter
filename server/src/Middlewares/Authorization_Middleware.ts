import { Request, Response, NextFunction } from "express";
import { RoulType_Enum } from "../Domain/Enumration/RoulType_Enum";
const jwt = require('jsonwebtoken');

export default class Authorization {
    UserOnly(req: Request, res: Response, next: NextFunction): void {
        let token: string | undefined = req.headers.authorization;

        if (!token) {
            res.status(401).send("Token missing.");
        }

        try {
            let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decode.role === RoulType_Enum.User) {
                next();
            }
            else {
                res.status(403).send("Access denied");
            }
        }
        catch (ex: unknown) {
            res.status(403).send("Invalid or expired token");
        }
    }
}