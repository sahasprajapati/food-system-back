import { Expose } from "class-transformer";
import { IsDefined, IsInt, IsNumber, IsString, Matches } from "class-validator";

export class MealTypeDto {
  @IsDefined()
  @Expose()
  @IsString()
  name: string;
}
