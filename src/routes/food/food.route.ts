import { Router } from "express";
import { FoodController } from "../../controller/food/food.controller";
import { CreateFoodDto } from "../../dto/food/createFood.dto";
import { EditFoodDto } from "../../dto/food/editFood.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();

const controller = new FoodController();
// List all food
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get one food by id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create new food
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateFoodDto)],
  controller.new
);
// Edit food
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(EditFoodDto)],
  controller.edit
);
// Delete food
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);
export default router;
