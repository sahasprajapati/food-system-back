import { NextFunction, Request, Response } from "express";
import { UserService } from "../../service/user/user.service";
import { responseHandler } from "../../utils/handler";

export class UserController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await UserService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const responseData = await UserService.getOneById(id);

    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    let { username, password, role }: IUser.CreateUser = req.body;
    const id: number = parseInt(req.params.id);
    // Try to save. If fails, username is already in use.
    const responseData = await UserService.createUser(
      id,
      username,
      password,
      role
    );

    // Get user from database
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { username, role }: IUser.UpdateUser = req.body;

    const responseData = await UserService.editUser(id, username, role);

    responseHandler(res, responseData as IResponse.Response<void>);
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);
    const responseData = await UserService.deleteUser(id); // Get user from database

    responseHandler(res, responseData);
  }
}
