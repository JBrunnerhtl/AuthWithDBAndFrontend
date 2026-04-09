const url = "http://localhost:3000";
import type {UserInput} from './types'
export async function login() {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const credentials: UserInput = {
        email: email.value,
        password: password.value,
    }
    try {
        const response = await fetch(url + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const {userClaims, expiresAt, accessToken } = await response.json();
        sessionStorage.setItem('token', accessToken)
    } catch (err) {
        console.error(err);
    }
}