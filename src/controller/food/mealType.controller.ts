import { NextFunction, Request, Response } from "express";
import { Food } from "../../entity/food/food.entity";
import { MealType } from "../../entity/food/mealType.entity";
import { FoodRepository } from "../../repositories/food/food.repository";
import { MealTypeRepository } from "../../repositories/food/mealType.repository";
export class MealTypeController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const mealTypeRepository = new MealTypeRepository();

    const mealTypes = await mealTypeRepository.find();
    res.send(mealTypes);
  }

  async getOneById(request: Request, response: Response, next: NextFunction) {
    const mealTypeRepository = new MealTypeRepository();

    const id: number = parseInt(request.params.id);

    let mealType: MealType;
    // Get Food from database
    try {
      mealType = await mealTypeRepository.findOneById(id);
    } catch (error) {
      response.status(404).send("Food not found");
      return;
    }
    response.send(mealType);
  }

  async addFoods(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();
    const mealTypeRepository = new MealTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds } = req.body;

    const mealType = await mealTypeRepository.findOneById(id);

    console.log("Food Ids", foodIds);
    const foods: Food[] = await foodRepository.findByIds(foodIds);
    console.log("Foods:", foods);
    mealType.foods = [...mealType.foods, ...foods];

    await mealTypeRepository.save(mealType);

    res.send(mealType);
  }

  async removeFoods(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();
    const mealTypeRepository = new MealTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds }: { foodIds: Array<number> } = req.body;

    let foodType = await mealTypeRepository.findOneById(id);

    console.log("Food Ids", foodIds);

    foodType.foods = foodType.foods.filter(
      (food) => !foodIds.includes(food.id)
    );

    await mealTypeRepository.save(foodType);

    res.send(foodType);
  }
  async new(req: Request, res: Response, next: NextFunction) {
    const mealTypeRepository = new MealTypeRepository();

    // Get parameters from body
    let { name } = req.body;

    let mealType = new MealType();
    mealType.name = name;

    // Try to save. If fails, Foodname is already in use.
    try {
      await mealTypeRepository.save(mealType);
    } catch (error) {
      console.error(error);
      // Conflict with server state
      res.status(409).send("Foodname already in use.");
      return;
    }

    // If all ok, send 201 response
    res.status(201).send("Food created");
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    const mealTypeRepository = new MealTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name } = req.body;

    // Try to find Food on database
    let mealType: MealType;
    try {
      mealType = await mealTypeRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }

    // Validate new values on model
    mealType.name = name;

    // Safe guard against, existing Foodname
    try {
      await mealTypeRepository.save(mealType);
    } catch (error) {
      res.status(409).send("Food name already in use");
      return;
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const mealTypeRepository = new MealTypeRepository();

    //   Get Id from url
    const id: number = parseInt(req.params.id);

    let mealType: MealType;
    try {
      mealType = await mealTypeRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }
    mealTypeRepository.delete(id);

    // After all send a 204 response
    res.status(204).send();
  }
}
