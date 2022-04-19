import { Expose } from "class-transformer";
import { IsDefined, IsString, Length, Matches } from "class-validator";

export class LoginDto {
  @IsDefined()
  @Expose()
  @IsString()
  username: string;

  @IsDefined()
  @Expose()
  @IsString()
  @Length(8)
  @Matches(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))
  password: string;
}
