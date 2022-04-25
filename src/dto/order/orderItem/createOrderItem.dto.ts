import { Expose } from "class-transformer";
import { IsDefined, Length, Matches } from "class-validator";
import { OrderItemDto } from "./orderItem.dto";

export class CreateOrderItemDto extends OrderItemDto {}
