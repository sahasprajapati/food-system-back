import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { FoodDto } from "./food.dto";

export class EditFoodDto extends FoodDto {}
