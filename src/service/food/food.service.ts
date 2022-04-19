import { Food } from "../../entity/food/food.entity";
import { FoodRepository } from "../../repositories/food/food.repository";
import { formatResponse } from "../../utils/handler";

export class FoodService {
  static repository = new FoodRepository();

  static async listAll(): Promise<IResponse.Response<Array<Food>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching food" },
      { statusCode: 200, message: "Foods fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<Food>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching food" },
      { statusCode: 200, message: "Food fetched successfully" }
    );
    return res;
  }

  static async create(
    name: string,
    description: string,
    price: number,
    quantity: number,
    startTime: IFood.FoodTime,
    endTime: IFood.FoodTime
  ): Promise<IResponse.Response<void>> {
    // Get parameters from body
    let food = new Food();
    food.name = name;
    food.description = description;
    food.price = price;
    food.quantity = quantity;
    food.startTime = startTime;
    food.endTime = endTime;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(food),
      { statusCode: 409, message: "Error while creating food" },
      { statusCode: 201, message: "Food saved successfully" }
    );

    return res;
  }

  static async edit(
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    startTime: IFood.FoodTime,
    endTime: IFood.FoodTime
  ): Promise<IResponse.Response<void>> {
    let foodResponse = await formatResponse(this.repository.findOneById(id), {
      statusCode: 401,
      message: "Error while fetching food",
    });
    // If error return
    if (foodResponse.error) {
      return { error: foodResponse.error };
    }

    const food = foodResponse.data;
    food.name = name;
    food.description = description;
    food.price = price;
    food.quantity = quantity;
    food.startTime = startTime;
    food.endTime = endTime;

    const response = formatResponse(
      this.repository.save(food),
      { statusCode: 409, message: "Error while editing food" },
      { statusCode: 200, message: "Food edited successfully" }
    );

    return response;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "Food not found",
      },
      { statusCode: 200, message: "Food deleted succesfully" }
    );
    return response;
  }
}
