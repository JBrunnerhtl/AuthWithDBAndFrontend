import { Router } from 'express';
import type { Request, Response } from 'express';
import {StatusCodes} from "http-status-codes";
import {CarService} from "../service/car-service";
import {Car} from "../types/types";
import {isAdmin, isAuthenticated} from "../middleware/auth-handler";
import {CarRepo} from "../repo/car-repo";

export const carRouter = Router();


carRouter.get("/all", isAuthenticated, (req: Request, res: Response) => {
    try {
        const cars: Car[] = CarService.getAllCars();
        return res.status(StatusCodes.OK).json(cars);
    }catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "An error occurred while fetching cars"});
    }
})

carRouter.get("/:id", isAuthenticated, isAdmin,(req: Request, res: Response) => {
    try {
        const id: string | string[] = req.params.id;
        if(Number.isNaN(id)) {
            throw new Error(`${id} is not a valid number`);
        }
        const car: Car | undefined= CarRepo.getCarById(Number(id));
        if(car === undefined) throw new Error("No car found");
        return res.status(StatusCodes.OK).json(car);
    }catch (e) {
        if(e instanceof Error) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: e.message});
        }
    }
})