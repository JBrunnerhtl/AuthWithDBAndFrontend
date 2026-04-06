import Database  from "better-sqlite3"
import * as sqlite from "better-sqlite3"
import * as crypt from "bcrypt";
import "dotenv/config"
export class DB {
    private static DB_NAME: string = process.env.DB_NAME || "default.db";
    public static createConnection() : Database.Database {
        const val: Database.Database = new Database(this.DB_NAME, {
            fileMustExist: false,
            verbose: (s) => console.log(s),
        })
        this.insertDefaultValues(val)
        return val;
    }


    private static insertDefaultValues(connection: Database.Database) : void {
        try {
            const userTable = `CREATE TABLE IF NOT EXISTS users (` +
                `EMAIL TEXT PRIMARY KEY, ` +
                `PASSWORD TEXT NOT NULL, ` +
                `ROLE TEXT NOT NULL ` +
                `) strict`;

            const carTable = `CREATE TABLE IF NOT EXISTS cars (` +
                `ID INTEGER PRIMARY KEY AUTOINCREMENT, ` +
                `NAME TEXT NOT NULL` +
                `) strict`
            connection.exec(userTable)
            connection.exec(carTable)

            const countOfUser = connection.prepare(`SELECT COUNT(*) as count FROM users`).get() as {count: number} || undefined;
            const countOfCars = connection.prepare(`SELECT COUNT(*) as count FROM cars`).get() as {count: number} || undefined;

            const salt = 10;
            if(countOfUser === undefined || countOfUser.count === 0) {
                const user1 = `INSERT INTO users (EMAIL, PASSWORD, ROLE)
                               VALUES ('test@gmail.com',
                                       '${crypt.hashSync(process.env.PASSWORD1 || "test", salt).toString()}', 'user')`;
                const user2 = `INSERT INTO users (EMAIL, PASSWORD, ROLE)
                               VALUES ('admin@gmail.com',
                                       '${crypt.hashSync(process.env.PASSWORD2 || "test", salt).toString()}', 'admin')`;

                connection.exec(user1)
                connection.exec(user2)
            }

            if(countOfCars === undefined || countOfCars.count === 0) {
                const car1 = `INSERT INTO CARS(NAME)
                              VALUES ('BMW')`;
                const car2 = `INSERT INTO CARS(NAME)
                              VALUES ('AUDI')`;
                connection.exec(car1)
                connection.exec(car2)
            }
        }catch(err) {
            console.log(err)
        }
    }
}