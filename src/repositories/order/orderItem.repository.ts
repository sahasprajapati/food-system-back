import { FindOptionsSelect, Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { OrderItem } from "../../entity/order/orderItem.entity";

export class OrderItemRepository {
  repository: Repository<OrderItem>;
  constructor() {
    this.repository = AppDataSource.getRepository(OrderItem);
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

  async save(orderItem: OrderItem) {
    await this.repository.save(orderItem);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
