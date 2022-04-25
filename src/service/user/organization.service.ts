import { Organization } from "../../entity/user/organization.entity";
import { OrganizationRepository } from "../../repositories/user/organization.repository";
import { formatResponse } from "../../utils/handler";

export class OrganizationService {
  static repository = new OrganizationRepository();

  static async listAll(): Promise<IResponse.Response<Array<Organization>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching organization" },
      { statusCode: 200, message: "Organization fetched successfully" }
    );

    return res;
  }

  static async getOneById(
    id: number
  ): Promise<IResponse.Response<Organization>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching organization" },
      { statusCode: 200, message: "Organization fetched successfully" }
    );
    return res;
  }

  static async create(
    name: string,
    creditLimit: number
  ): Promise<IResponse.Response<void>> {
    // Get parameters from body
    const profile = new Organization();

    profile.name = name;
    profile.creditLimit = creditLimit;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(profile),
      { statusCode: 409, message: "Error while creating profile" },
      { statusCode: 201, message: "Organization saved successfully" }
    );

    return res;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "Organization not found",
      },
      { statusCode: 200, message: "Organization deleted succesfully" }
    );
    return response;
  }
  static async edit(
    id: number,
    name: string,
    creditLimit: number
  ): Promise<IResponse.Response<void>> {
    let profileResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 401,
        message: "Error while fetching profile",
      }
    );
    // If error return
    if (profileResponse.error) {
      return { error: profileResponse.error };
    }

    const profile = profileResponse.data;
    profile.name = name;
    profile.creditLimit = creditLimit;

    const response = formatResponse(
      this.repository.save(profile),
      { statusCode: 409, message: "Error while editing profile" },
      { statusCode: 200, message: "Organization edited successfully" }
    );

    return response;
  }
}
