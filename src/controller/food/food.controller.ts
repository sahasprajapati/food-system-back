import { NextFunction, Request, Response } from "express";
import { FoodService } from "../../service/food/food.service";
import { responseHandler } from "../../utils/handler";

export class FoodController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await FoodService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const responseData = await FoodService.getOneById(id);
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { name, description, price, quantity, startTime, endTime } = req.body;
    const responseData = await FoodService.create(
      name,
      description,
      price,
      quantity,
      startTime,
      endTime
    );
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name, description, price, quantity, startTime, endTime } = req.body;
    const responseData = await FoodService.edit(
      id,
      name,
      description,
      price,
      quantity,
      startTime,
      endTime
    );
    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);

    const responseData = await FoodService.delete(id);
    responseHandler(res, responseData);
  }
}
