import { Router } from "express";
import { FoodTypeController } from "../../controller/food/foodType.controller";
import { CreateFoodTypeDto } from "../../dto/foodType/createFoodType.dto";
import { EditFoodTypeDto } from "../../dto/foodType/editFoodType.dto";
import { FoodToFoodType } from "../../dto/foodType/foodToFoodType.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();

const controller = new FoodTypeController();

// List All Food Type
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get one food type by id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);

// Create new food type
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateFoodTypeDto)],
  controller.new
);
// Add foods to food type
router.post(
  "/addFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(FoodToFoodType)],
  controller.addFoods
);
// Remove food from food type
router.post(
  "/removeFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(FoodToFoodType)],
  controller.removeFoods
);
// Edit food type
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(EditFoodTypeDto)],
  controller.edit
);
// Delete food type
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
