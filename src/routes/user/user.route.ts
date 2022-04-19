import { Router } from "express";
import { UserController } from "../../controller/user/user.controller";
import { CreateUserDto } from "../../dto/user/createUser.dto";
import { EditUserDto } from "../../dto/user/editUser.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new UserController();
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
  [checkJwt, checkRole(["admin"]), validateBody(CreateUserDto)],
  controller.new
);
// Edit User
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(EditUserDto)],
  controller.edit
);
// Delete User
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
