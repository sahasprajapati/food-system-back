import { Router } from "express";
import { MealTypeController } from "../../controller/food/mealType.controller";
import { CreateMealTypeDto } from "../../dto/mealType/createMealType.dto";
import { EditMealTypeDto } from "../../dto/mealType/editMealType.dto";
import { FoodToMealType } from "../../dto/mealType/foodToMealType.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";
const router = Router();

const controller = new MealTypeController();
// List All meals
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// List meal by Id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create new Mealtyoe
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateMealTypeDto)],
  controller.new
);
// Add food to mealtype
router.post(
  "/addFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(FoodToMealType)],
  controller.addFoods
);
// Remove food from mealtype
router.post(
  "/removeFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(FoodToMealType)],
  controller.removeFoods
);
// Edit mealtype
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(EditMealTypeDto)],
  controller.edit
);
// Delete mealtype
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
