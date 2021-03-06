import { Profile } from "../../entity/user/profile.entity";
import { ProfileRepository } from "../../repositories/user/profile.repository";
import { formatResponse } from "../../utils/handler";

export class ProfileService {
  static repository = new ProfileRepository();

  static async listAll(): Promise<IResponse.Response<Array<Profile>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "Profiles fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<Profile>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching order" },
      { statusCode: 200, message: "Profile fetched successfully" }
    );
    return res;
  }

  static async create(
    name: string,
    email: string
  ): Promise<IResponse.Response<void>> {
    // Get parameters from body
    const profile = new Profile();

    profile.name = name;
    profile.email = email;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(profile),
      { statusCode: 409, message: "Error while creating profile" },
      { statusCode: 201, message: "Profile saved successfully" }
    );

    return res;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "Profile not found",
      },
      { statusCode: 200, message: "Profile deleted succesfully" }
    );
    return response;
  }
  static async edit(
    id: number,
    name: string,
    email: string
  ): Promise<IResponse.Response<void>> {
    let profileResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 401,
        message: "Error while fetching user",
      }
    );
    // If error return
    if (profileResponse.error) {
      return { error: profileResponse.error };
    }

    const profile = profileResponse.data;
    profile.name = name;
    profile.email = email;

    const response = formatResponse(
      this.repository.save(profile),
      { statusCode: 409, message: "Error while editing profile" },
      { statusCode: 200, message: "Profile edited successfully" }
    );

    return response;
  }
}
