import { Expose } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsIn,
  IsString,
  Matches,
} from "class-validator";

export class ProfileDto {
  @IsDefined()
  @IsString()
  @Expose()
  name: string;

  @IsDefined()
  @IsString()
  @Expose()
  @IsEmail()
  email: string;
}
