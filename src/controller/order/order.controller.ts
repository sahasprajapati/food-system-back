import { NextFunction, Request, Response } from "express";
import { OrderService } from "../../service/order/order.service";
import { responseHandler } from "../../utils/handler";

export class OrderController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await OrderService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const responseData = await OrderService.getOneById(id);
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { orderItemIds }: IOrder.CreateOrder = req.body;
    const responseData = await OrderService.create(orderItemIds);
    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);

    const responseData = await OrderService.delete(id);
    responseHandler(res, responseData);
  }

  async addOrderItems(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { orderItemIds }: IOrder.AddOrderItems = req.body;

    const responseData = await OrderService.addOrderItems(id, orderItemIds);
    responseHandler(res, responseData);
  }

  async removeOrderItems(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    let { orderItemIds }: IOrder.RemoveOrderItems = req.body;

    const responseData = await OrderService.removeOrderItems(id, orderItemIds);
    responseHandler(res, responseData);
  }
}
