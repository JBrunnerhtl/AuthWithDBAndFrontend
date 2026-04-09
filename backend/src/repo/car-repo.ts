import {Car} from "../types/types";
import {DB} from "../database/db"
import Database from "better-sqlite3";

export class CarRepo {
    public static getAllCars(): Car[] | undefined {
        const con: Database.Database = DB.createConnection();
        try {
            return con.prepare(`SELECT ID as id, NAME as name FROM cars`).all() as Car[] || undefined;
        }catch (e) {
            return undefined;
        }finally {
            con.close();
        }
    }

    public static getCarById(id: number): Car | undefined {
        const con: Database.Database = DB.createConnection();
        try {
            return con.prepare<number>(`SELECT ID as id, NAME as name FROM cars WHERE ID = ?`).get(id) as Car || undefined;
        }catch (e) {
            return undefined;
        }finally {
            con.close();
        }
    }
}