import { Expose } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDefined } from "class-validator";

export class FoodToMealType {
  @IsDefined()
  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  foodIds: Array<number>;
}
