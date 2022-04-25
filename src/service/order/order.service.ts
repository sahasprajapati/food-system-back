import { Order } from "../../entity/order/order.entity";
import { OrderRepository } from "../../repositories/order/order.repository";
import { OrderItemRepository } from "../../repositories/order/orderItem.repository";
import { formatResponse } from "../../utils/handler";

export class OrderService {
  static repository = new OrderRepository();

  static async listAll(): Promise<IResponse.Response<Array<Order>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "Orders fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<Order>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "Order fetched successfully" }
    );
    return res;
  }

  static async create(orderIds: number[]): Promise<IResponse.Response<void>> {
    const orderItemRepository = new OrderItemRepository();
    // Get parameters from body
    const order = new Order();

    const orderItemsResponse = await formatResponse(
      orderItemRepository.findByIds(orderIds),
      {
        statusCode: 400,
        message: "Error while fetching OrderItem",
      }
    );

    if (orderItemsResponse.error) {
      return { error: orderItemsResponse.error };
    }

    order.orderItems = orderItemsResponse.data;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(order),
      { statusCode: 409, message: "Error while creating order" },
      { statusCode: 201, message: "Order saved successfully" }
    );

    return res;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "Order not found",
      },
      { statusCode: 200, message: "Order deleted succesfully" }
    );
    return response;
  }

  static async addOrderItems(
    id: number,
    orderIds: number[]
  ): Promise<IResponse.Response<void>> {
    const orderItemRepository = new OrderItemRepository();
    const ordersResponse = await formatResponse(
      orderItemRepository.findByIds(orderIds),
      {
        statusCode: 404,
        message: "Orders not found",
      }
    );
    // If error return
    if (ordersResponse.error) {
      return { error: ordersResponse.error };
    }

    const orderResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "Order not found",
      }
    );
    // If error return
    if (orderResponse.error) {
      return { error: orderResponse.error };
    }

    orderResponse.data.orderItems = [
      ...orderResponse.data.orderItems,
      ...ordersResponse.data,
    ];

    const response = await formatResponse(
      this.repository.save(orderResponse.data),
      {
        statusCode: 409,
        message: "OrderItems could not be inserted.",
      },
      {
        statusCode: 200,
        message: "OrderItems added to order",
      }
    );
    return response;
  }

  static async removeOrderItems(
    id: number,
    orderIds: number[]
  ): Promise<IResponse.Response<void>> {
    const orderResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "Order not found",
      }
    );
    // If error return
    if (orderResponse.error) {
      return { error: orderResponse.error };
    }

    orderResponse.data.orderItems = orderResponse.data.orderItems.filter(
      (order) => !orderIds.includes(order.id)
    );

    const response = await formatResponse(
      this.repository.save(orderResponse.data),
      {
        statusCode: 409,
        message: "OrderItems could not be removed.",
      },
      {
        statusCode: 200,
        message: "OrderItems removed from order",
      }
    );
    return response;
  }
}
