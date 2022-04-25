import { Expose } from "class-transformer";
import { IsDefined, Length, Matches } from "class-validator";
import { OrganizationDto } from "./organization.dto";

export class CreateOrganizationDto extends OrganizationDto {}
