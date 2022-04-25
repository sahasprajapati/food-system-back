import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { OrganizationDto } from "./organization.dto";

export class UpdateOrganizationDto extends OrganizationDto {}
