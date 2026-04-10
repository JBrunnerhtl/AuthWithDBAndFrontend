import {UserDB, UserInput} from "../types/types";
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

    public static createNewUser(user: UserInput) {
        const db: Database.Database = DB.createConnection();
        try {
            DB.beginTransaction(db)
            const stmt = db.prepare("Insert INTO Users(EMAIL, PASSWORD, ROLE) VALUES (?,?, 'user');")
            const rows: number = stmt.run(user.email, user.password).changes;
            if(rows === 0) {
                throw new Error("User already exists");
            }
            DB.commitTransaction(db)
        } catch (e) {
            DB.rollbackTransaction(db)
            if(e instanceof Error) {
                throw new Error("User already exists");
            }
        }finally {
            db.close();
        }
    }


}