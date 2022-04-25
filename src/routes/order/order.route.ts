import { Router } from "express";
import { OrderController } from "../../controller/order/order.controller";
import { CreateOrderDto } from "../../dto/order/order/createOrder.dto";
import { OrderItemToOrderDto } from "../../dto/order/order/orderItemToOrder.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new OrderController();
// List All Orders
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get Order By Id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create Order
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateOrderDto)],
  controller.new
);

// Delete Order
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

// Add foods to food type
router.post(
  "/addFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(OrderItemToOrderDto)],
  controller.addOrderItems
);
// Remove food from food type
router.post(
  "/removeFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(OrderItemToOrderDto)],
  controller.removeOrderItems
);

export default router;
