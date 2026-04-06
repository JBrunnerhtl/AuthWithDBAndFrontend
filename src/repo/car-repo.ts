import {Car} from "../types/types";
import {DB} from "../database/db"
import Database from "better-sqlite3";

export class CarRepo {
    public static getAllCars(): Car[] | undefined {
        try {
            const con: Database.Database = DB.createConnection();
            return con.prepare(`SELECT ID as id, NAME as name FROM cars`).all() as Car[] || undefined;
        }catch (e) {
            return undefined;
        }
    }
}