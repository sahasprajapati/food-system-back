import { rejects } from "assert";
import { resolve } from "path";
import { User } from "../../entity/user/user.entity";
import { UserRepository } from "../../repositories/user/user.repository";
import { formatResponse } from "../../utils/handler";
/**
 *
 *
 * @export
 * @class UserService
 */
export class UserService {
  static repository = new UserRepository();

  /**
   *
   *
   * @static
   * @return {*}  {Promise<IResponse.Response<Array<User>>>}
   * @memberof UserService
   */
  static async listAll(): Promise<IResponse.Response<Array<User>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching user" },
      { statusCode: 200, message: "Users fetched successfully" }
    );

    return res;
  }

  /**
   *
   *
   * @static
   * @param {number} id
   * @return {*}  {Promise<IResponse.Response<User>>}
   * @memberof UserService
   */
  static async getOneById(id: number): Promise<IResponse.Response<User>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching user" },
      { statusCode: 200, message: "User fetched successfully" }
    );
    return res;
  }
  /**
   *
   *
   * @static
   * @param {number} id
   * @param {string} username
   * @param {string} password
   * @param {IUser.UserRole} role
   * @return {*}  {Promise<IResponse.Response<void>>}
   * @memberof UserService
   */
  static async createUser(
    id: number,
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
      { statusCode: 401, message: "Error while saving user" },
      { statusCode: 201, message: "User saved successfully" }
    );

    return res;
  }

  /**
   *
   *
   * @static
   * @param {number} id
   * @param {string} username
   * @param {IUser.UserRole} role
   * @return {*}  {(Promise<IResponse.Response<User> | IResponse.Response<void>>)}
   * @memberof UserService
   */
  static async editUser(
    id: number,
    username: string,

    role: IUser.UserRole
  ): Promise<IResponse.Response<User> | IResponse.Response<void>> {
    let userResponse = await formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching user" },
      { statusCode: 200, message: "User fetched successfully" }
    );
    // Get user from database
    if (userResponse.error) {
      return userResponse;
    }

    const user = userResponse.data;
    user.username = username;
    user.role = role;

    const response = formatResponse(
      this.repository.save(user),
      { statusCode: 401, message: "Error while editing user" },
      { statusCode: 200, message: "User edited successfully" }
    );

    return response;
  }

  /**
   *
   *
   * @static
   * @param {number} id
   * @return {*}  {Promise<IResponse.Response<void>>}
   * @memberof UserService
   */
  static async deleteUser(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "User not found",
      },
      { statusCode: 201, message: "User deleted succesfully" }
    );
    return response;
  }
}
