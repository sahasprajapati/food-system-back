import { FindOptionsSelect, Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Organization } from "../../entity/user/organization.entity";

export class OrganizationRepository {
  repository: Repository<Organization>;
  constructor() {
    this.repository = AppDataSource.getRepository(Organization);
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

  async save(organization: Organization) {
    await this.repository.save(organization);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
