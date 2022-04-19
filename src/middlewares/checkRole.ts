import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user/user.entity";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get user ID from previous middleware
    const id = res.locals.jwtPayload.userId;

    console.log("ID", id);
    // Get user role from database
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneByOrFail(id);
    } catch (id) {
      res.status(403).send({ error: "Forbidden Action" });
    }

    // Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(403).send({ error: "Forbidden Action" });
  };
};
