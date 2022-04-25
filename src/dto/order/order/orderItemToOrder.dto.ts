import { Expose } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined } from "class-validator";

export class OrderItemToOrderDto {
  @IsDefined()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  orderItemIds: Array<number>;
}
