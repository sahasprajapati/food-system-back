import { MealType } from "../../entity/food/mealType.entity";
import { FoodRepository } from "../../repositories/food/food.repository";
import { MealTypeRepository } from "../../repositories/food/mealType.repository";
import { formatResponse } from "../../utils/handler";

export class MealTypeService {
  static repository = new MealTypeRepository();

  static async listAll(): Promise<IResponse.Response<Array<MealType>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching mealType" },
      { statusCode: 200, message: "Meal Types fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<MealType>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching mealType" },
      { statusCode: 200, message: "MealType fetched successfully" }
    );
    return res;
  }

  static async create(name: string): Promise<IResponse.Response<void>> {
    // Get parameters from body
    let mealType = new MealType();
    mealType.name = name;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(mealType),
      { statusCode: 409, message: "Error while creating mealType" },
      { statusCode: 201, message: "MealType saved successfully" }
    );

    return res;
  }

  static async edit(
    id: number,
    name: string
  ): Promise<IResponse.Response<void>> {
    let mealTypeResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 401,
        message: "Error while fetching mealType",
      }
    );
    // If error return
    if (mealTypeResponse.error) {
      return { error: mealTypeResponse.error };
    }

    const mealType = mealTypeResponse.data;
    mealType.name = name;

    const response = formatResponse(
      this.repository.save(mealType),
      { statusCode: 409, message: "Name already in Use" },
      { statusCode: 200, message: "MealType edited successfully" }
    );

    return response;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "MealType not found",
      },
      { statusCode: 200, message: "MealType deleted succesfully" }
    );
    return response;
  }

  static async addFoods(
    id: number,
    foodIds: number[]
  ): Promise<IResponse.Response<void>> {
    const foodRepository = new FoodRepository();
    const mealTypeResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "MealType not found",
      }
    );
    // If error return
    if (mealTypeResponse.error) {
      return { error: mealTypeResponse.error };
    }

    const foodsResponse = await formatResponse(
      foodRepository.findByIds(foodIds),
      {
        statusCode: 404,
        message: "Foods not found",
      }
    );
    // If error return
    if (foodsResponse.error) {
      return { error: foodsResponse.error };
    }

    mealTypeResponse.data.foods = [
      ...mealTypeResponse.data.foods,
      ...foodsResponse.data,
    ];

    const response = await formatResponse(
      this.repository.save(mealTypeResponse.data),
      {
        statusCode: 409,
        message: "Foods could not be inserted.",
      },
      {
        statusCode: 200,
        message: "Foods added to mealType",
      }
    );
    return response;
  }

  static async removeFoods(
    id: number,
    foodIds: number[]
  ): Promise<IResponse.Response<void>> {
    const mealTypeResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "MealType not found",
      }
    );
    // If error return
    if (mealTypeResponse.error) {
      return { error: mealTypeResponse.error };
    }

    mealTypeResponse.data.foods = mealTypeResponse.data.foods.filter(
      (food) => !foodIds.includes(food.id)
    );

    const response = await formatResponse(
      this.repository.save(mealTypeResponse.data),
      {
        statusCode: 409,
        message: "Foods could not be removed.",
      },
      {
        statusCode: 200,
        message: "Foods removed from mealType",
      }
    );
    return response;
  }
}
