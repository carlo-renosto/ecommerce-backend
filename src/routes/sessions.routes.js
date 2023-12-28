
import { Router } from "express";
import { config } from "../config/config.js";
import { authenticate } from "../middlewares/auth.js";

import { createPasswordHash, generateToken } from "../utils.js";

import { usersController } from "../controller/users.controller.js";

import { generateTokenEmail, sendPwChangeEmail, verifyTokenEmail } from "../config/configGmail.js";
import { userService } from "../repository/index.js";

const router = Router();

router.get("/login", (request, response) => {
    response.render("login");
});

router.get("/signup", (request, response) => {
    response.render("signup");
});

router.get("/recover", (request, response) => {
    response.render("recover");
});

router.get("/recover-form", (request, response) => {
    const token = request.query.token;
    response.render("recoverForm", {token});
});

router.post("/user-login", authenticate("loginLocalStrategy"), async(request, response) => {
    const token = generateToken(request.user);
    response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
});

router.get("/user-login-github", authenticate("loginGithubStrategy"));

router.get(`${config.github.callback_url}-login`, authenticate("loginGithubStrategy"), (request, response) => {
    const token = generateToken(request.user);
    response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
});

router.post("/user-signup", authenticate("signupLocalStrategy"), async(request, response) => {
    response.render("login", {message: "Usuario registrado"});
});

router.get("/user-signup-github", authenticate("signupGithubStrategy"));

router.get(config.github.callback_url,  authenticate("signupGithubStrategy"), (request, response) => {
    if(request.isAuthenticated() && request.user) {
        const token = generateToken(request.user);
        response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
    }
    else {
        response.render("signup", {error: "Email ya registrado"});
    }
});

router.post("/user-recover", async(request, response) => {
    try {
        const email = request.body.email;

        const emailToken = generateTokenEmail(email, 10 * 60);

        await sendPwChangeEmail(request, email, emailToken);

        response.json({status: "success", message: "Correo enviado"});
    }
    catch(error) {
        console.log(error);
        response.json({status: "error", message: "Correo no enviado (error)"});
    }
});

router.post("/user-recover-form", async(request, response) => {
    try {
        const password = request.body.password;
        const token = request.query.token;
        const email = verifyTokenEmail(token);

        const user = await userService.getUserByEmail(email);
        user._doc.password = createPasswordHash(password);

        await userService.updateUser(user._id, user._doc);

        response.render("login", {message: "Contraseña reestablecida"});
    }
    catch(error) {
        console.log(error);
        response.json({status: "error", message: "Contraseña no reestablecida (error)"});
    }
});

router.get("/logout", (request, response) => { 
    response.clearCookie("cookieToken").redirect("/api/sessions/login");
});

router.get("/current", authenticate("currentStrategy"), usersController.getUserCurrent);

export { router as sessionsRouter };