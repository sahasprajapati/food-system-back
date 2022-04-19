import { NextFunction, Request, Response } from "express";
import { Food } from "../../entity/food/food.entity";

import { FoodRepository } from "../../repositories/food/food.repository";

export class FoodController {
  async listAll(request: Request, response: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();

    const Foods = await foodRepository.find();
    response.send(Foods);
  }

  async getOneById(request: Request, response: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();

    const id: number = parseInt(request.params.id);

    let food: Food;
    // Get Food from database
    try {
      food = await foodRepository.findOneById(id);
    } catch (error) {
      response.status(404).send("Food not found");
      return;
    }
    response.send(food);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();

    // Get parameters from body
    let { name, description, price, quantity } = req.body;
    const startTime: IFood.FoodTime = req.body.startTime;
    const endTime: IFood.FoodTime = req.body.endTime;
    let food = new Food();
    food.name = name;
    food.description = description;
    food.price = price;
    food.quantity = quantity;
    food.startTime = startTime;
    food.endTime = endTime;

    // Try to save. If fails, Foodname is already in use.
    try {
      await foodRepository.save(food);
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
    const foodRepository = new FoodRepository();

    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name, description, price, quantity } = req.body;

    // Try to find Food on database
    let food: Food;
    try {
      food = await foodRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }

    // Validate new values on model
    food.name = name;
    food.description = description;
    food.price = price;
    food.quantity = quantity;

    // Safe guard against, existing Foodname
    try {
      await foodRepository.save(food);
    } catch (error) {
      res.status(409).send("Food name already in use");
      return;
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const foodRepository = new FoodRepository();

    //   Get Id from url
    const id: number = parseInt(req.params.id);

    let food: Food;
    try {
      food = await foodRepository.findOneById(id);
    } catch (error) {
      res.status(404).send("Food not found");
      return;
    }
    foodRepository.delete(id);

    // After all send a 204 response
    res.status(204).send();
  }
}
