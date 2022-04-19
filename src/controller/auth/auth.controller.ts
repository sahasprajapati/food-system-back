import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user/user.entity";
import { authConfig } from "../../config/auth";
import { validate } from "class-validator";

import randToken from "rand-token";
import { generateAccessToken } from "../../utils/jwt";
import { Auth } from "../../entity/auth/auth.entity";
import { AuthService } from "../../service/auth/auth.service";
import { responseHandler } from "../../utils/handler";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    //   Check if username and password are set
    let { username, password } = req.body;

    const response = await AuthService.login(username, password);

    responseHandler(res, response);
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const { username, refreshToken } = req.body;
    const response = await AuthService.refreshToken(username, refreshToken);
    responseHandler(res, response);
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    // Get ID fro JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from body
    const { oldPassword, newPassword } = req.body;

    const response = await AuthService.changePassword(
      id,
      oldPassword,
      newPassword
    );
    responseHandler(res, response);
  }
}
