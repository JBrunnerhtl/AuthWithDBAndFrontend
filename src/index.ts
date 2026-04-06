import {DB} from "./database/db"
import Database from "better-sqlite3";
const db: Database.Database = DB.createConnection();
db.close();