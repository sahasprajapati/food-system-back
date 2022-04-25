import { Router } from "express";
import { ProfileController } from "../../controller/user/profile.controller";
import { CreateProfileDto } from "../../dto/user/profile/createProfile.dto";
import { UpdateProfileDto } from "../../dto/user/profile/updateProfile.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();
const controller = new ProfileController();
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
  [checkJwt, checkRole(["admin"]), validateBody(CreateProfileDto)],
  controller.new
);
// Edit User
router.patch(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"]), validateBody(UpdateProfileDto)],
  controller.edit
);
// Delete User
router.delete(
  "/:id([0-9])+",
  [checkJwt, checkRole(["admin"])],
  controller.delete
);

export default router;
