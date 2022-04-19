import { FindOptionsSelect, Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Food } from "../../entity/food/food.entity";

export class FoodRepository {
  repository: Repository<Food>;
  constructor() {
    this.repository = AppDataSource.getRepository(Food);
  }

  async find() {
    return await this.repository.find({
      relations: {
        foodType: true,
        mealTypes: true,
      },
    });
  }

  async findOneById(id: number) {
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: number[]) {
    return await this.repository.find({
      where: {
        id: Raw((alias) => `${alias} IN (:...idArray)`, {
          idArray: ids,
        }),
      },
    });
  }

  async save(Food: Food) {
    await this.repository.save(Food);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
