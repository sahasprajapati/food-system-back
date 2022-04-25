import { Expose } from "class-transformer";
import { IsDefined, Length, Matches } from "class-validator";
import { ExpenseDto } from "./expense.dto";

export class CreateExpenseDto extends ExpenseDto {}
