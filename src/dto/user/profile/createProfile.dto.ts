import { Expose } from "class-transformer";
import { IsDefined, Length, Matches } from "class-validator";
import { ProfileDto } from "./profile.dto";

export class CreateProfileDto extends ProfileDto {}
