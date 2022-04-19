import { IsNotEmpty, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { FoodType } from "./foodType.entity";
import { MealType } from "./mealType.entity";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
  name: string;

  @Column()
  @Length(4, 100)
  description: string;

  @Column()
  price: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  quantity: number;

  @ManyToMany(() => MealType, (mealType) => mealType.foods)
  @JoinTable()
  mealTypes: MealType[];

  @ManyToOne(() => FoodType, (foodType) => foodType.foods)
  foodType: FoodType;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
