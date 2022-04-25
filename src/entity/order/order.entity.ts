import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Expense } from "./expense.entity";
import { OrderItem } from "./orderItem.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({ default: false })
  serveMe: boolean;

  @Column({ default: "on-process" })
  status: string;

  @ManyToOne(() => Expense, (expense) => expense.orders)
  expense: Expense;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
