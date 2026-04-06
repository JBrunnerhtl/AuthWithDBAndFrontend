import {UserDB} from "../types/types";
import {DB} from "../database/db";
import Database from "better-sqlite3";
export class UserRepo {
    public static getAllUsers() : UserDB[] | undefined {
        const db: Database.Database = DB.createConnection();
        try {
            const val = db.prepare(`SELECT EMAIL as email, PASSWORD as password, ROLE as role
                        FROM users`).all() as UserDB[] || undefined;
            return val as UserDB[];
        }catch(err) {
            throw new Error("Error while getting users from database");
        }finally {
            db.close();
        }
    }
}