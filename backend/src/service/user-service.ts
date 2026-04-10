import {UserClaims, UserDB, UserInput} from "../types/types";
import {UserRepo} from "../repo/user-repo";
import * as bcrypt from 'bcrypt';


export class UserService {
    public static checkUserCredentials(user: UserInput): UserClaims | undefined {
        try {
            const users: UserDB[] | undefined = UserRepo.getAllUsers();
            if(users === undefined) throw new Error("No user found");
            const findUserByEmail: UserDB | undefined = users.find((userSearch) => userSearch.email === user.email);
            if(findUserByEmail === undefined) throw new Error("No user found");
            if(!bcrypt.compareSync(user.password, findUserByEmail.password)) throw new Error("Wrong password");
            return {
                email: findUserByEmail.email,
                role: findUserByEmail.role,
            }
        }catch(err) {
            if(err instanceof Error) {
                throw new Error(err.message);
            }
        }
    }
    public static createNewUser(user: UserInput) {
        console.log(user);
        if(user.email === undefined || user.email === null) throw new Error("User credentials are required");
        UserRepo.createNewUser(user);
    }
}