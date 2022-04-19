import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { FoodType } from "../../entity/food/foodType.entity";
export class FoodTypeRepository {
  repository: Repository<FoodType>;
  constructor() {
    this.repository = AppDataSource.getRepository(FoodType);
  }

  async find() {
    return await this.repository.find({
      select: ["id", "name"],
      relations: {
        foods: true,
      },
    });
  }

  async findOneById(id: number) {
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
      select: ["id", "name"],
      relations: {
        foods: true,
      },
    });
  }

  async save(foodType: FoodType) {
    await this.repository.save(foodType);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
