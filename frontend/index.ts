const url = "http://localhost:3000";
import type {UserInput, Car, AuthErrorResponse} from './types'
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
const fetchCarsButton = document.getElementById("fetch-cars") as HTMLButtonElement;
fetchCarsButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchCars();
})

const fetchSpecificCarButton = document.getElementById("fetch-specific-car") as HTMLButtonElement;
fetchSpecificCarButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetchSpecificCar();
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
        alert(`Welcome ${userClaims.email}, you are logged in as ${userClaims.role}. Your token expires at ${new Date(expiresAt).toLocaleTimeString()}`);
    } catch (err) {
        if(err instanceof Error) {
            alert(err.message);
        }
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
        if(response.status !== StatusCodes.OK) {
            const responseAuth: AuthErrorResponse = await response.json();
            throw new Error(responseAuth.message);
        }
        const cars: Car[] = await response.json();
        createTable(cars, "cars-table");

    }catch(err) {
        if(err instanceof Error) {
            alert(err.message);
        }
        carTable.innerHTML=""
        console.log(err);
    }
}

export async function fetchSpecificCar() {
    const numberOfCar = document.getElementById("car-id") as HTMLInputElement;
    const table = document.getElementById("car-table") as HTMLTableElement;
    table.innerHTML = '';
    try {
        if(numberOfCar.value === "" || numberOfCar.value === undefined) throw new Error("You need to enter an id")
       const response = await fetch(url + "/car/" + numberOfCar.value, {
           method: "GET",
           headers: {
               "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
           }
       });
       if(response.status === StatusCodes.FORBIDDEN) throw new Error("You don't have permission to perform this action");
       if(response.status !== StatusCodes.OK) {
           const responseAuth: AuthErrorResponse = await response.json();
           throw new Error(responseAuth.message);
       }
       const car: Car = await response.json();
       createTable([car], "car-table");
    }catch(err) {
        console.log(err)
        if(err instanceof Error) {
            alert(err.message);
        }
        numberOfCar.value = "";
        table.innerHTML=""
    }
}

function createTable(cars: Car[], tableId: string) {
    const carTable = document.getElementById(tableId) as HTMLTableElement;
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
}