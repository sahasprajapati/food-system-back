import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { ProfileDto } from "./profile.dto";

export class UpdateProfileDto extends ProfileDto {}
