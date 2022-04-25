import { NextFunction, Request, Response } from "express";
import { ProfileService } from "../../service/user/profile.service";
import { responseHandler } from "../../utils/handler";

export class ProfileController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await ProfileService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const responseData = await ProfileService.getOneById(id);

    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    let { name, email }: IProfile.CreateProfile = req.body;

    // Try to save. If fails, username is already in use.
    const responseData = await ProfileService.create(name, email);

    // Get user from database
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name, email }: IProfile.UpdateProfile = req.body;

    const responseData = await ProfileService.edit(id, name, email);

    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);
    const responseData = await ProfileService.delete(id); // Get user from database

    responseHandler(res, responseData);
  }
}
