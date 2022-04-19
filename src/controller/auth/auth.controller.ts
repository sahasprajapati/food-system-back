import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user/user.entity";
import { authConfig } from "../../config/auth";
import { validate } from "class-validator";
import { UserRepository } from "../../repositories/user/user.repository";
import { AuthRepository } from "../../repositories/auth/auth.repository";

import randToken from "rand-token";
import { generateAccessToken } from "../../utils/jwt";
import { Auth } from "../../entity/auth/auth.entity";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const userRepository = new UserRepository();
    const authRepository = new AuthRepository();
    //   Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) res.status(401).send();
    // Get user from database
    let user: User;
    try {
      user = await userRepository.findLoginCredentialsByUsername(username);
    } catch (error) {
      console.error(error);
      res.status(401).send();
      return;
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sign JWT, valid for 1 hout
    const token = generateAccessToken(user.id, user.username, user.role);

    const refreshToken = randToken.uid(25);

    let auth = new Auth();
    auth.refreshToken = refreshToken;
    // await authRepository.save(auth);

    user.auth = auth;
    await userRepository.save(user);

    // Send jwt in repsonse
    res.send({ accessToken: token, refreshToken: user.auth.refreshToken });
  }

  async generateToken(req: Request, res: Response, next: NextFunction) {
    const authRepository = new AuthRepository();

    const { username, refreshToken } = req.body;
    let auth: Auth;

    try {
      auth = await authRepository.findOne(refreshToken);
    } catch (error) {
      console.error(error);
      res.status(404).send("Token not found.");
      return;
    }

    if (auth.user.username !== username) {
      res.status(404).send("User not found");
      return;
    }

    // Generate new Access Token
    const token = generateAccessToken(
      auth.user.id,
      auth.user.username,
      auth.user.role
    );

    const newRefreshToken = randToken.uid(25);

    auth.refreshToken = newRefreshToken;

    await authRepository.save(auth);

    // Send jwt in repsonse
    res.send({ accessToken: token, refreshToken: auth.refreshToken });
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    const userRepository = new UserRepository();

    // Get ID fro JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from body
    const { oldPassword, newPassword } = req.body;
    // Bad request
    if (!(oldPassword && newPassword)) res.status(400).send();

    // Get user from database
    let user: User;
    try {
      user = await userRepository.findLoginCredentialsById(id);
    } catch (error) {
      console.error(error);
      res.status(401).send("User not found");
      return;
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send("Old password mismatch");
      return;
    }

    // Validate model (password length)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Hash new password and save
    user.hashPassword();

    userRepository.save(user);

    res.status(204).send();
  }
}
