import { IsNotEmpty, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Profile } from "./profile.entity";
import { Auth } from "../auth/auth.entity";
import { Organization } from "./organization.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({
    default: "user",
  })
  @IsNotEmpty()
  role: string;

  @OneToOne((type) => Auth, (auth) => auth.user, { cascade: true })
  @JoinColumn()
  auth: Auth;

  @OneToOne((type) => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
