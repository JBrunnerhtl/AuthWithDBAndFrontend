import { Router } from 'express';
import type { Request, Response } from 'express';
import {StatusCodes} from "http-status-codes";
import {CarService} from "../service/car-service";
import {Car} from "../types/types";

export const carRouter = Router();


carRouter.get("/all", (req: Request, res: Response) => {
    try {
        const cars: Car[] = CarService.getAllCars();
        return res.status(StatusCodes.OK).json(cars);
    }catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "An error occurred while fetching cars"});
    }
})

carRouter.get("/:id", (req: Request, res: Response) => {
    try {

    }catch (e) {

    }
})