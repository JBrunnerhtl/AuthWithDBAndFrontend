export type UserInput = {
    email: string;
    password: string;
}

export type UserDB = {
    email: string;
    password: string;
    role: string;
}

export type UserClaims = {
    email: string;
    role: string;
}

export type Car = {
    id: number;
    name: string;
}