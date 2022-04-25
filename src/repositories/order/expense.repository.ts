import { FindOptionsSelect, Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Expense } from "../../entity/order/expense.entity";

export class ExpenseRepository {
  repository: Repository<Expense>;
  constructor() {
    this.repository = AppDataSource.getRepository(Expense);
  }

  async find() {
    return await this.repository.find({
      relations: {},
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

  async save(expense: Expense) {
    await this.repository.save(expense);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
