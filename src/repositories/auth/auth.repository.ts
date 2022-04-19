import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Auth } from "../../entity/auth/auth.entity";
export class AuthRepository {
  repository: Repository<Auth>;
  constructor() {
    this.repository = AppDataSource.getRepository(Auth);
  }

  async find() {
    return await this.repository.find({
      select: ["id", "refreshToken"],
    });
  }

  async findOne(refreshToken: string) {
    return await this.repository.findOneOrFail({
      where: {
        refreshToken,
      },
      select: ["id", "refreshToken"],
      relations: {
        user: true,
      },
    });
  }

  async save(auth: Auth) {
    await this.repository.save(auth);
  }

  async delete(id: number) {
    await this.repository.delete(id);
  }
}
