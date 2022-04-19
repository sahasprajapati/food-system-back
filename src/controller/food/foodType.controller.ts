import { NextFunction, Request, Response } from "express";
import { FoodTypeService } from "../../service/food/foodType.service";
import { responseHandler } from "../../utils/handler";

export class FoodTypeController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await FoodTypeService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const responseData = await FoodTypeService.getOneById(id);
    responseHandler(res, responseData);
  }

  async addFoods(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds } = req.body;

    const responseData = await FoodTypeService.addFoods(id, foodIds);
    responseHandler(res, responseData);
  }

  async removeFoods(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds }: { foodIds: Array<number> } = req.body;

    const responseData = await FoodTypeService.removeFoods(id, foodIds);
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { name } = req.body;
    const responseData = await FoodTypeService.create(name);
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name } = req.body;

    const responseData = await FoodTypeService.edit(id, name);
    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);

    const responseData = await FoodTypeService.delete(id);
    responseHandler(res, responseData);
  }
}
