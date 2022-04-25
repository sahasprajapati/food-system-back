import { Expose } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEnum,
  IsIn,
  IsString,
  Matches,
} from "class-validator";

export class ExpenseDto {
  @IsDefined()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  orderItemIds: Array<number>;
}
