import { Expose } from "class-transformer";
import { IsDefined, IsInt, IsNumber, IsString, Matches } from "class-validator";

export class FoodTypeDto {
  @IsDefined()
  @Expose()
  @IsString()
  name: string;
}
