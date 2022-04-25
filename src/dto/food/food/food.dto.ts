import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";

export class FoodDto {
  @IsDefined()
  @Expose()
  name: string;

  @IsDefined()
  @Expose()
  description: string;

  @IsDefined()
  @Expose()
  price: number;

  @IsDefined()
  @Expose()
  qunatity: number;
}
