import { Expose } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  Length,
  Matches,
} from "class-validator";
import { OrderDto } from "./order.dto";

export class CreateOrderDto extends OrderDto {
  @IsDefined()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  orderItemIds: Array<number>;
}
