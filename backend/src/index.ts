import express from "express";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {userRouter} from "./router/user-router";
import {carRouter} from "./router/car-router";
import {DB} from "./database/db";
import "dotenv/config"
import Database from "better-sqlite3";
import cors from "cors"
const app = express();
const db: Database.Database = DB.createConnection();
DB.insertDefaultValues(db);
db.close();
app.use(express.json());
app.use(cors())
app.use("/auth", userRouter);
app.use("/car", carRouter);
app.get("/", (req:Request, res:Response) => {
    return res.status(StatusCodes.OK).send("Hello world");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
    console.log("http://localhost:" + process.env.PORT || 3000);
})