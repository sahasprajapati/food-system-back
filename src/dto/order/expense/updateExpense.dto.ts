import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { ExpenseDto } from "./expense.dto";

export class UpdateExpenseDto extends ExpenseDto {}
