import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { MealTypeDto } from "./mealType.dto";

export class CreateMealTypeDto extends MealTypeDto {}
