import { Expose } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsIn,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";

export class OrderItemDto {
  @IsDefined()
  @Expose()
  @IsNumber()
  quantity: number;

  @IsDefined()
  @Expose()
  @IsNumber()
  foodId: number;
}
