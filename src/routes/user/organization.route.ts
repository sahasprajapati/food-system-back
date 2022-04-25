import { Router } from "express";
import { OrganizationController } from "../../controller/user/organization.controller";
import { CreateOrganizationDto } from "../../dto/user/organization/createOrganization.dto";
import { UpdateOrganizationDto } from "../../dto/user/organization/updateOrganization.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new OrganizationController();
// List All Users
router.get("/", [checkJwt, checkRole(["admin"])], controller.listAll);
// Get User By Id
router.get(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.getOneById
);
// Create User
router.post(
  "/",
  [checkJwt, checkRole(["admin"]), validateBody(CreateOrganizationDto)],
  controller.new
);
// Edit User
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(UpdateOrganizationDto)],
  controller.edit
);
// Delete User
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
