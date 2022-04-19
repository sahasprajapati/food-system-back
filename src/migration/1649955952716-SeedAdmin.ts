import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/user/user.entity";
import { UserRepository } from "../repositories/user/user.repository";

export class SeedAdmin1649955952716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = new UserRepository();
    const user = new User();
    user.username = "admin";
    user.password = "Admin123";
    user.role = "admin";

    user.hashPassword();
    repository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
