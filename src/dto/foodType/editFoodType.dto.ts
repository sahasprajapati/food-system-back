import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { FoodTypeDto } from "./foodType.dto";

export class EditFoodTypeDto extends FoodTypeDto {}
