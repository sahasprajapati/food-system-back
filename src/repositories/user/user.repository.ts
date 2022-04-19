import { FindOptionsSelect, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user/user.entity";

export class UserRepository {
  repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async find() {
    return await this.repository.find({
      select: ["id", "username", "role"],
    });
  }

  async findOneByUsername(username: string) {
    return await this.repository.findOneOrFail({
      where: {
        username,
      },
      select: ["id", "username", "role"],
    });
  }

  async findLoginCredentialsByUsername(username: string) {
    return await this.repository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async findLoginCredentialsById(id: number) {
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findOneById(id: number) {
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
      select: ["id", "username", "role"],
    });
  }

  async save(user: User) {
    await this.repository.save(user);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
