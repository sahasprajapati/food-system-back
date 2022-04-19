import { User } from "../../entity/user/user.entity";
import { UserRepository } from "../../repositories/user/user.repository";
import { formatResponse } from "../../utils/handler";

export class UserService {
  static repository = new UserRepository();

  static async listAll(): Promise<IResponse.Response<Array<User>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching user" },
      { statusCode: 200, message: "Users fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<User>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching user" },
      { statusCode: 200, message: "User fetched successfully" }
    );
    return res;
  }

  static async create(
    username: string,
    password: string,
    role: IUser.UserRole
  ): Promise<IResponse.Response<void>> {
    // Get parameters from body
    let user = new User();
    user.username = username;
    user.password = password;
    user.role = role as IUser.UserRole;

    // Hash password to securely store on DB
    user.hashPassword();
    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(user),
      { statusCode: 409, message: "Error while creating user" },
      { statusCode: 201, message: "User saved successfully" }
    );

    return res;
  }

  static async edit(
    id: number,
    username: string,

    role: IUser.UserRole
  ): Promise<IResponse.Response<void>> {
    let userResponse = await formatResponse(this.repository.findOneById(id), {
      statusCode: 401,
      message: "Error while fetching user",
    });
    // If error return
    if (userResponse.error) {
      return { error: userResponse.error };
    }

    const user = userResponse.data;
    user.username = username;
    user.role = role;

    const response = formatResponse(
      this.repository.save(user),
      { statusCode: 409, message: "Error while editing user" },
      { statusCode: 200, message: "User edited successfully" }
    );

    return response;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "User not found",
      },
      { statusCode: 200, message: "User deleted succesfully" }
    );
    return response;
  }
}
