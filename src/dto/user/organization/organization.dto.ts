import { Expose } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsIn,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";

export class OrganizationDto {
  @IsDefined()
  @IsString()
  @Expose()
  name: string;

  @IsDefined()
  @IsNumber()
  @Expose()
  creditLimit: number;
}
