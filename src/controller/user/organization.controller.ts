import { NextFunction, Request, Response } from "express";
import { OrganizationService } from "../../service/user/organization.service";
import { responseHandler } from "../../utils/handler";

export class OrganizationController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    const responseData = await OrganizationService.listAll();
    responseHandler(res, responseData);
  }

  async getOneById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const responseData = await OrganizationService.getOneById(id);

    responseHandler(res, responseData);
  }

  async new(req: Request, res: Response, next: NextFunction) {
    let { name, creditLimit }: IOrganization.CreateOrganization = req.body;

    // Try to save. If fails, username is already in use.
    const responseData = await OrganizationService.create(name, creditLimit);

    // Get user from database
    responseHandler(res, responseData);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    //   Get ID from url
    const id: number = parseInt(req.params.id);

    // Get values from body
    const { name, creditLimit }: IOrganization.UpdateOrganization = req.body;

    const responseData = await OrganizationService.edit(id, name, creditLimit);

    responseHandler(res, responseData);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    //   Get Id from url
    const id: number = parseInt(req.params.id);
    const responseData = await OrganizationService.delete(id); // Get user from database

    responseHandler(res, responseData);
  }
}
