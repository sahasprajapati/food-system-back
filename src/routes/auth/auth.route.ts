import { Router } from "express";
import { AuthController } from "../../controller/auth/auth.controller";
import { ChangePasswordDto } from "../../dto/auth/changePassword.dto";
import { LoginDto } from "../../dto/auth/login.dto";
import { TokenDto } from "../../dto/auth/token.dto";
import { checkJwt } from "../../middlewares/checkJwt";
import { validateBody } from "../../middlewares/validateBody";

const router = Router();

const controller = new AuthController();
// Login
router.post("/login", [validateBody(LoginDto)], controller.login);
// Refresh token to generate access token
router.post("/token", [validateBody(TokenDto)], controller.generateToken);
// Change password
router.post(
  "/change-password",
  [checkJwt, validateBody(ChangePasswordDto)],
  controller.changePassword
);
export default router;
