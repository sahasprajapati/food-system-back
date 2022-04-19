import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

export const generateAccessToken = (
  id: number,
  username: string,
  role: string
) => {
  return jwt.sign(
    {
      userId: id,
      username: username,
      role: role,
    },
    authConfig.jwtSecret,
    {
      expiresIn: authConfig.jwtExpiresIn,
    }
  );
};
