import { Expose } from "class-transformer";
import { IsDefined, IsString, Length } from "class-validator";

export class TokenDto {
  @IsDefined()
  @Expose()
  @IsString()
  username: string;

  @IsDefined()
  @Expose()
  @IsString()
  @Length(25)
  refreshToken: string;
}
