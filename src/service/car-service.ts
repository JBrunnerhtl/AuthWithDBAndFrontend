import {Car} from "../types/types";
import {CarRepo} from "../repo/car-repo";

export class CarService {
    public static getAllCars() : Car[] {
        let cars: Car[] | undefined = CarRepo.getAllCars();
        if(cars === undefined) {
            cars = [];
        }
        return cars;
    }
}