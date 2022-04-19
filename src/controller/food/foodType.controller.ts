import { NextFunction, Request, Response } from "express";
import { Food } from "../../entity/food/food.entity";
import { FoodType } from "../../entity/food/foodType.entity";
import { FoodRepository } from "../../repositories/food/food.repository";
import { FoodTypeRepository } from "../../repositories/food/foodType.repository";

export class FoodTypeController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const foodTypeRepository = new FoodTypeRepository();

    const mealTypes = await foodTypeRepository.find();
    res.send(mealTypes);
  }

  async getOneById(request: Request, response: Response, next: NextFunction) {
    const foodTypeRepository = new FoodTypeRepository();

    const id: number = parseInt(request.params.id);

    let foodType: FoodType;
    // Get Food from database
    try {
      foodType = await foodTypeRepository.findOneById(id);
    } catch (error) {
      response.status(404).send("Food type not found");
      return;
    }
    response.send(foodType);
  }

  async addFoods(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();
    const foodTypeRepository = new FoodTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds } = req.body;

    const foodType = await foodTypeRepository.findOneById(id);

    console.log("Food Ids", foodIds);
    const foods: Food[] = await foodRepository.findByIds(foodIds);
    console.log("Foods:", foods);
    foodType.foods = [...foodType.foods, ...foods];

    await foodTypeRepository.save(foodType);

    res.send(foodType);
  }

  async removeFoods(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();
    const foodTypeRepository = new FoodTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { foodIds }: { foodIds: Array<number> } = req.body;

    let foodType = await foodTypeRepository.findOneById(id);

    console.log("Food Ids", foodIds);

    foodType.foods = foodType.foods.filter(
      (food) => !foodIds.includes(food.id)
    );

    await foodTypeRepository.save(foodType);

    res.send(foodType);
  }
  async new(req: Request, res: Response, next: NextFunction) {
    const foodTypeRepository = new FoodTypeRepository();

    // Get parameters from body
    let { name } = req.body;

    let foodType = new FoodType();
    foodType.name = name;

    // Try to save. If fails, Foodname is already in use.
    try {
      await foodTypeRepository.save(foodType);
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
    const foodTypeRepository = new FoodTypeRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name } = req.body;

    // Try to find Food on database
    let foodType: FoodType;
    try {
      foodType = await foodTypeRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }

    // Validate new values on model
    foodType.name = name;

    // Safe guard against, existing Foodname
    try {
      await foodTypeRepository.save(foodType);
    } catch (error) {
      res.status(409).send("Food name already in use");
      return;
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const foodTypeRepository = new FoodTypeRepository();

    //   Get Id from url
    const id: number = parseInt(req.params.id);

    let foodType: FoodType;
    try {
      foodType = await foodTypeRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }
    foodTypeRepository.delete(id);

    // After all send a 204 response
    res.status(204).send();
  }
}
