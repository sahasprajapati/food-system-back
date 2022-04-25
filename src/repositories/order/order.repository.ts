import { FindOptionsSelect, Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Order } from "../../entity/order/order.entity";

export class OrderRepository {
  repository: Repository<Order>;
  constructor() {
    this.repository = AppDataSource.getRepository(Order);
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

  async save(order: Order) {
    await this.repository.save(order);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
