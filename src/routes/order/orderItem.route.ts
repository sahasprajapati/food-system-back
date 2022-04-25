import { Router } from "express";
import { OrderItemController } from "../../controller/order/orderItem.controller";
import { CreateOrderItemDto } from "../../dto/order/orderItem/createOrderItem.dto";
import { UpdateOrderItemDto } from "../../dto/order/orderItem/updateOrderItem.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new OrderItemController();
// List All OrderItems
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get OrderItem By Id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create OrderItem
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateOrderItemDto)],
  controller.new
);
// Edit OrderItem
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(UpdateOrderItemDto)],
  controller.edit
);
// Delete OrderItem
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
