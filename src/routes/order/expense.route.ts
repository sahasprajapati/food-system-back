import { Router } from "express";
import { ExpenseController } from "../../controller/order/expense.controller";
import { CreateExpenseDto } from "../../dto/order/expense/createExpense.dto";
import { OrderToExpenseDto } from "../../dto/order/expense/orderToExpense.dto";
import { UpdateExpenseDto } from "../../dto/order/expense/updateExpense.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new ExpenseController();
// List All Expenses
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get Expense By Id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create Expense
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateExpenseDto)],
  controller.new
);

// Delete Expense
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

// Add order to expense
router.post(
  "/addFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(OrderToExpenseDto)],
  controller.addOrders
);
// Remove order from expense
router.post(
  "/removeFoods/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(OrderToExpenseDto)],
  controller.removeOrders
);

export default router;
