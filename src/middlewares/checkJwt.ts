import * as jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { authConfig } from "../config/auth";
import { generateAccessToken } from "../utils/jwt";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get jwt token from head

  const token = <string>req.headers["authorization"].replace("Bearer ", "");

  let jwtPayload: { userId: number; username: string; role: string };

  // Try validate token and get data
  try {
    jwtPayload = <any>jwt.verify(token, authConfig.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token not valid, response with 401(unauthorized)
    console.error(error);
    res.status(401).send();
    return;
  }
  console.log(jwtPayload);

  // Token validity: 1hour
  // Send new token on every request
  const { userId, username, role } = jwtPayload;

  const newToken = generateAccessToken(userId, username, role);
  res.setHeader("accessToken", newToken);

  // Call next middleware or controller
  next();
};
