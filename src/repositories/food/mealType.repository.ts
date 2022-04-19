import { FindOptionsSelect, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { MealType } from "../../entity/food/mealType.entity";

export class MealTypeRepository {
  repository: Repository<MealType>;
  constructor() {
    this.repository = AppDataSource.getRepository(MealType);
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

  async save(mealType: MealType) {
    await this.repository.save(mealType);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
