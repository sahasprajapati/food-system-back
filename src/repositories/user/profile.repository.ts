import { Raw, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Profile } from "../../entity/user/profile.entity";

export class ProfileRepository {
  repository: Repository<Profile>;
  constructor() {
    this.repository = AppDataSource.getRepository(Profile);
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

  async save(profile: Profile) {
    await this.repository.save(profile);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
