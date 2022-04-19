import { NextFunction, Request, Response } from "express";
import { MealTypeService } from "../../service/food/mealType.service";
import { responseHandler } from "../../utils/handler";
export class MealTypeController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await MealTypeService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const responseData = await MealTypeService.getOneById(id);

    responseHandler(res, responseData);
  }

  async addFoods(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds } = req.body;
    // Try to save. If fails, username is already in use.
    const responseData = await MealTypeService.addFoods(id, foodIds);

    // Get user from database
    responseHandler(res, responseData);
  }

  async removeFoods(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds }: { foodIds: Array<number> } = req.body;

    // Try to save. If fails, username is already in use.
    const responseData = await MealTypeService.removeFoods(id, foodIds);

    // Get user from database
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { name } = req.body;

    // Try to save. If fails, username is already in use.
    const responseData = await MealTypeService.create(name);

    // Get user from database
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name } = req.body;

    const responseData = await MealTypeService.edit(id, name);

    responseHandler(res, responseData as IResponse.Response<void>);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);
    const responseData = await MealTypeService.delete(id); // Get user from database

    responseHandler(res, responseData);
  }
}
