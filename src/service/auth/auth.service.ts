import { resolve } from "path";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import { UserRepository } from "../../repositories/user/user.repository";
import { formatResponse } from "../../utils/handler";
import { generateAccessToken } from "../../utils/jwt";
import randToken from "rand-token";
import { Auth } from "../../entity/auth/auth.entity";

export class AuthService {
  static repository = new AuthRepository();

  static async login(
    username: string,
    password: string
  ): Promise<IResponse.Response<IAuth.LoginResponse>> {
    const userRepository = new UserRepository();

    // Get user from database
    const userResponse = await formatResponse(
      userRepository.findLoginCredentialsByUsername(username),
      { statusCode: 400, message: "Invalid Credential" }
    );
    // If error return
    if (userResponse.error) {
      return { error: userResponse.error };
    }

    // Check if encrypted password match
    if (!userResponse.data.checkIfUnencryptedPasswordIsValid(password))
      return { error: { statusCode: 401, message: "Invalid Credential" } };

    const { id, username: name, role } = userResponse.data;
    // Sign JWT, valid for 1 hour
    const token = generateAccessToken(id, name, role);

    const refreshToken = randToken.uid(25);

    let auth = new Auth();
    auth.refreshToken = refreshToken;

    userResponse.data.auth = auth;
    const res = await formatResponse(
      userRepository.save(userResponse.data),
      {
        statusCode: 401,
        message: "Invalid Credentials",
      },
      {
        statusCode: 200,
        message: "Logged In",
      }
    );

    // await authRepository.save(auth);
    return {
      data: { accessToken: token, refreshToken: refreshToken },
      success: res.success,
      error: res.error,
    };
  }

  static async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<IResponse.Response<void>> {
    const userRepository = new UserRepository();

    const userResponse = await formatResponse(
      userRepository.findLoginCredentialsById(id),
      {
        statusCode: 401,
        message: "Invalid Credential",
      }
    );
    // If error return
    if (userResponse.error) {
      return { error: userResponse.error };
    }
    // Check if encrypted password match
    if (!userResponse.data.checkIfUnencryptedPasswordIsValid(oldPassword))
      return { error: { statusCode: 401, message: "Invalid Credential" } };
    userResponse.data.password = newPassword;

    // Hash new password
    userResponse.data.hashPassword();

    const res = await formatResponse(
      userRepository.save(userResponse.data),
      {
        statusCode: 409,
        message: "Error while updating password",
      },
      {
        message: "Password successfully changed",
      }
    );

    return res;
  }

  static async refreshToken(
    username: string,
    refreshToken: string
  ): Promise<IResponse.Response<IAuth.LoginResponse>> {
    const authResponse = await formatResponse(
      this.repository.findOne(refreshToken),
      {
        statusCode: 401,
        message: "Invalid token",
      }
    );
    // If error return
    if (authResponse.error) {
      return { error: authResponse.error };
    }

    if (authResponse.data.user.username !== username) {
      return { error: { statusCode: 403, message: "Forbidden Action" } };
    }
    const { id, username: name, role } = authResponse.data.user;

    // Generate new Access Token
    const token = generateAccessToken(id, name, role);
    const newRefreshToken = randToken.uid(25);

    authResponse.data.refreshToken = newRefreshToken;

    const res = await formatResponse(
      this.repository.save(authResponse.data),
      {
        statusCode: 409,
        message: "Failed to save auth data",
      },
      {
        message: "Access token refreshed successfully",
      }
    );

    return {
      data: { accessToken: token, refreshToken: newRefreshToken },
      success: res.success,
      error: res.error,
    };
  }
}
