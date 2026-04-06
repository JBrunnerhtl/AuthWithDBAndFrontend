import Router from "express"
import type {Request, Response} from "express"
import {UserClaims, UserInput} from "../types/types";
import {StatusCodes} from "http-status-codes";
import {UserService} from "../service/user-service";
import * as jwt from "jsonwebtoken";

export const userRouter = Router()


userRouter.post("/login", async (req: Request, res: Response) => {
    const user: UserInput = req.body;
    if(!user || user.email === undefined || user.password === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).send("Body not in correct format");
    }
    try {
        const claims: UserClaims | undefined=UserService.checkUserCredentials(user);
        if(claims === undefined) throw new Error("User credentials not found");
        const minutes = 15;
        const expiresAt = new Date(Date.now() + minutes * 60000);
        const token = jwt.sign(
            {
                user: claims,
                exp: expiresAt.getTime() / 1000,
            },
            process.env.SECRET_KEY || "12345",
        )
        return res.status(StatusCodes.OK).send({userClaims: claims,
            expiresAt: expiresAt,
            accessToken: token,
        });
    }catch(err) {
        if(err instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).send(err.message);
        }
    }
})