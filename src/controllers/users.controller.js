import { Router } from "express";
import loginSchema from "../helpers/schemas/login.schema.js";
import registerSchema from "../helpers/schemas/register.schema.js";
import * as AuthService from "../services/users/index.js";
import updateProfileSchema from "../helpers/schemas/updateProfile.schema.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import authenticateWithJWT from "../helpers/functions/authenticateWithJWT.js";
import multer from "multer";
const authRouter = Router();
const storageEngine = multer.diskStorage({
  destination: (req, file, func) => {
    func(null, process.env.PICLOCATION);

    {
    }
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}${file.originalname}`;
    cb(null, filename);
  },
});
const uploads = multer({
  storage: storageEngine,
});

authRouter.post("/login", JoiMiddleware(loginSchema), AuthService.login);
authRouter.post(
  "/register",
  JoiMiddleware(registerSchema),
  AuthService.register
);
authRouter.patch(
  "/updateProfile",
  authenticateWithJWT,
  JoiMiddleware(updateProfileSchema),
  AuthService.updateProfile
);

authRouter.post("/logout", authenticateWithJWT, AuthService.logout);
authRouter.get("/userById", authenticateWithJWT, AuthService.getUserById);
authRouter.post(
  "/uploadProfilePic",
  uploads.single("profilePic"),
  authenticateWithJWT,
  AuthService.uploadProfilePic
);
authRouter.post("/verify-account/:id/:token", AuthService.verifyLink);
export default authRouter;
