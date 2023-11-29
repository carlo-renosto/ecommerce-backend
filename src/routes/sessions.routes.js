
import { Router } from "express";
import { config } from "../config/config.js";
import { authenticate } from "../middlewares/auth.js";

import { generateToken } from "../utils.js";

import { usersController } from "../controller/users.controller.js";

const router = Router();

router.get("/login", (request, response) => {
    response.render("login");
});

router.get("/signup", (request, response) => {
    response.render("signup");
});

router.post("/user-login", authenticate("loginLocalStrategy"), async(request, response) => {
    const token = generateToken(request.user);

    response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
});

router.post("/user-signup", authenticate("signupLocalStrategy"), async(request, response) => {
    response.render("login", {message: "Usuario registrado"});
});

router.get("/user-login-github", authenticate("loginGithubStrategy"));

router.get(`${config.github.callback_url}-login`, authenticate("loginGithubStrategy"), async(request, response) => {
    response.redirect("/profile");
});

router.get("/user-signup-github", authenticate("signupGithubStrategy"));

router.get(config.github.callback_url, authenticate("signupGithubStrategy"), async(request, response) => {
    response.redirect("/profile");
});

router.get("/logout", (request, response) => { 
    response.clearCookie("cookieToken").redirect("/api/sessions/login");
});

router.get("/current", authenticate("currentStrategy"), usersController.getUserCurrent);

export { router as sessionsRouter };