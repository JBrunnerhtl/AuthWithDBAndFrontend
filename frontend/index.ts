const url = "http://localhost:3000";
import type {UserInput} from './types'

const form = document.getElementById("login-form") as HTMLFormElement;
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login();
})
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    logout();
})
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
        alert("Login failed. Please check your credentials and try again.");
        email.value = "";
        password.value = "";
        console.error(err);
    }
}

export function logout() {
    sessionStorage.removeItem('token')
}