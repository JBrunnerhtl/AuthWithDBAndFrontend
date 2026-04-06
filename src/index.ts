import express from "express";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {userRouter} from "./router/user-router";
import "dotenv/config"
const app = express();

app.use(express.json());

app.use("/auth", userRouter);

app.get("/", (req:Request, res:Response) => {
    return res.status(StatusCodes.OK).send("Hello world");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
    console.log("http://localhost:" + process.env.PORT || 3000);
})