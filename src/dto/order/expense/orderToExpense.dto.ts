import { Expose } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined } from "class-validator";

export class OrderToExpenseDto {
  @IsDefined()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  orderIds: Array<number>;
}
