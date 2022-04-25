import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { OrderItemDto } from "./orderItem.dto";

export class UpdateOrderItemDto extends OrderItemDto {}
