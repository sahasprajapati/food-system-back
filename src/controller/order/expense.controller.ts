import { NextFunction, Request, Response } from "express";
import { ExpenseService } from "../../service/order/expense.service";
import { responseHandler } from "../../utils/handler";

export class ExpenseController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await ExpenseService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const responseData = await ExpenseService.getOneById(id);
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { orderIds }: IExpense.CreateExpense = req.body;
    const responseData = await ExpenseService.create(orderIds);
    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);

    const responseData = await ExpenseService.delete(id);
    responseHandler(res, responseData);
  }

  async addOrders(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { orderIds }: IExpense.AddOrders = req.body;

    const responseData = await ExpenseService.addOrders(id, orderIds);
    responseHandler(res, responseData);
  }

  async removeOrders(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { orderIds }: IExpense.RemoveOrders = req.body;

    const responseData = await ExpenseService.removeOrders(id, orderIds);
    responseHandler(res, responseData);
  }
}
