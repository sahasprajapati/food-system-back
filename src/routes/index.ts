import { Request, Response, Router } from "express";
import auth from "./auth/auth.route";

import user from "./user/user.route";
import profile from "./user/profile.route";
import organization from "./user/organization.route";

import food from "./food/food.route";
import mealType from "./food/mealType.route";
import foodType from "./food/foodType.route";

import order from "./order/order.route";
import orderItem from "./order/orderItem.route";
import expense from "./order/expense.route";

const router = Router();

router.use("/auth", auth);

router.use("/user", user);
router.use("/profile", profile);
router.use("/organization", organization);

router.use("/food", food);
router.use("/mealType", mealType);
router.use("/foodType", foodType);

router.use("/order", order);
router.use("/orderItem", orderItem);
router.use("/expense", expense);

export default router;
