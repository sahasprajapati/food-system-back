import { OrderItem } from "../../entity/order/orderItem.entity";
import { FoodRepository } from "../../repositories/food/food.repository";
import { OrderItemRepository } from "../../repositories/order/orderItem.repository";
import { formatResponse } from "../../utils/handler";

export class OrderItemService {
  static repository = new OrderItemRepository();

  static async listAll(): Promise<IResponse.Response<Array<OrderItem>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "OrderItems fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<OrderItem>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "OrderItem fetched successfully" }
    );
    return res;
  }

  static async create(
    foodId: number,
    quantity: number
  ): Promise<IResponse.Response<void>> {
    const foodRepository = new FoodRepository();
    // Get parameters from body
    const orderItem = new OrderItem();

    const foodResponse = await formatResponse(
      foodRepository.findOneById(foodId),
      {
        statusCode: 400,
        message: "Error while fetching Food",
      }
    );

    if (foodResponse.error) {
      return { error: foodResponse.error };
    }

    orderItem.food = foodResponse.data;
    orderItem.quantity = quantity;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(orderItem),
      { statusCode: 409, message: "Error while creating order" },
      { statusCode: 201, message: "OrderItem saved successfully" }
    );

    return res;
  }

  static async edit(
    id: number,
    quantity: number
  ): Promise<IResponse.Response<void>> {
    const orderItemResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 400,
        message: "Error while fetching OrderItem",
      }
    );

    if (orderItemResponse.error) {
      return { error: orderItemResponse.error };
    }

    orderItemResponse.data.quantity = quantity;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(orderItemResponse.data),
      { statusCode: 409, message: "Error while editing order" },
      { statusCode: 201, message: "OrderItem edited successfully" }
    );

    return res;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "OrderItemItem not found",
      },
      { statusCode: 200, message: "OrderItemItem deleted succesfully" }
    );
    return response;
  }
}
