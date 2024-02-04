
import { Router } from "express";
import { sessionsController } from "../controller/sessions.controller.js";
import { config } from "../config/config.js";
import { authenticate } from "../utils/middlewares/auth.js";


import { uploadProfile } from "../utils/multer.js";

const router = Router();

router.get("/login", sessionsController.login);

router.get("/signup", sessionsController.signup);

router.get("/recover", sessionsController.recover);

router.get("/recover-form", sessionsController.recoverForm);

router.post("/login-user", authenticate("loginLocalStrategy"), sessionsController.loginUser);

router.get("/login-user-github", authenticate("loginGithubStrategy"));

router.get(`${config.github.callback_url}-login`, authenticate("loginGithubStrategy"), sessionsController.loginUserGithub);

router.post("/signup-user", uploadProfile.single("avatar"), authenticate("signupLocalStrategy"), sessionsController.signupUser);

router.get("/signup-user-github", authenticate("signupGithubStrategy"));

router.get(config.github.callback_url,  authenticate("signupGithubStrategy"), sessionsController.signupUserGithub);

router.get("/logout", authenticate("jwt-auth"), sessionsController.logout);

router.post("/user-recover", sessionsController.recoverFormSend);

router.post("/user-recover-form", sessionsController.recoverPasswordSend);

export { router as sessionsRouter };