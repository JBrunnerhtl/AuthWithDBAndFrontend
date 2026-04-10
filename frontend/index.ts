const url = "http://localhost:3000";
import type {UserInput, Car} from './types'
import {StatusCodes} from "http-status-codes";

const form = document.getElementById("login-form") as HTMLFormElement;
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login();
})
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    logout();
});
const fetchCarButton = document.getElementById("fetch-cars") as HTMLButtonElement;
fetchCarButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchCars();
})
export async function login() {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    console.log(email.value);
    console.log(password.value);
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
        if(response.status !== StatusCodes.OK) throw new Error(response.statusText);
        const {userClaims, expiresAt, accessToken } = await response.json();
        sessionStorage.setItem('token', accessToken)
    } catch (err) {
        alert("Login failed. Please check your credentials and try again.");
        console.error(err);
    }finally {
        email.value = "";
        password.value = "";
    }
}

export function logout() {
    sessionStorage.removeItem('token')
}


export async function fetchCars() {
    const carTable = document.getElementById("cars-table") as HTMLTableElement;
    carTable.innerHTML = '';
    try {
        const response = await fetch(url + "/car/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        if(response.status !== StatusCodes.OK) throw new Error(response.statusText);
        const cars: Car[] = await response.json();

        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tr = document.createElement("tr");
        tdId.textContent = "Id";
        tdName.textContent = "Name";
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        carTable.appendChild(tr);
        cars.forEach(car => {
            const tr = document.createElement("tr");
            const tdName = document.createElement("td");
            const tdId = document.createElement("td");
            tdName.textContent = car.name;
            tdId.textContent = car.id.toString();
            tr.appendChild(tdId);
            tr.appendChild(tdName);
            carTable.appendChild(tr);
        });
    }catch(err) {
        alert("An error occurred while fetching cars. Please try again later. Are you sure you are logged in?");
        carTable.innerHTML=""
        console.log(err);
    }
}

export function fetchSpecificCar(id: number) {

}