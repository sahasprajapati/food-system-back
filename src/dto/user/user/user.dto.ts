import { Expose } from "class-transformer";
import { IsDefined, IsEnum, IsIn, IsString, Matches } from "class-validator";

export class UserDto {
  @IsDefined()
  @Expose()
  @IsString()
  username: string;

  @IsDefined()
  @Expose()
  @IsIn(["admin", "user"])
  role: string;
}
