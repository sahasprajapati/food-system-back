import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { UserDto } from "./user.dto";

export class UpdateUserDto extends UserDto {}
