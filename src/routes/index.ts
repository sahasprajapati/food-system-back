import { Request, Response, Router } from "express";
import auth from "./auth/auth.route";
import user from "./user/user.route";
import food from "./food/food.route";
import mealType from "./food/mealType.route";
import foodType from "./food/foodType.route";
const router = Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/food", food);
router.use("/mealType", mealType);
router.use("/foodType", foodType);

export default router;
