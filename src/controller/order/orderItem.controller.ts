import { NextFunction, Request, Response } from "express";
import { IOrderItem } from "../../@types/order/orderItem";
import { OrderItemService } from "../../service/order/orderItem.service";
import { responseHandler } from "../../utils/handler";

export class OrderItemController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await OrderItemService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const responseData = await OrderItemService.getOneById(id);
    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    // Get parameters from body
    let { foodId, quantity }: IOrderItem.AddOrderItem = req.body;
    const responseData = await OrderItemService.create(foodId, quantity);
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { quantity }: IOrderItem.UpdateOrderItem = req.body;

    const responseData = await OrderItemService.edit(id, quantity);

    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);

    const responseData = await OrderItemService.delete(id);
    responseHandler(res, responseData);
  }
}
