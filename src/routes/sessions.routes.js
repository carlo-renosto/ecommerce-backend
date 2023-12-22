
import { Router } from "express";
import { config } from "../config/config.js";
import { authenticate } from "../middlewares/auth.js";

import { generateToken } from "../utils.js";

import { usersController } from "../controller/users.controller.js";

import { transport } from "../config/configGmail.js";

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

});

router.post("/user-login", authenticate("loginLocalStrategy"), async(request, response) => {
    const token = generateToken(request.user);
    response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
});

router.post("/user-signup", authenticate("signupLocalStrategy"), async(request, response) => {
    response.render("login", {message: "Usuario registrado"});
});

router.get("/user-login-github", authenticate("loginGithubStrategy"));

router.get(`${config.github.callback_url}-login`, authenticate("loginGithubStrategy"), (request, response) => {
    const token = generateToken(request.user);
    response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
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

        const result = await transport.sendMail({
            from: config.gmail.account,
            to: email,
            subject: "Recuperacion de cuenta",
            html: `
                <p>Hola ${email}, haga clic aquí para recuperar su cuenta:</p>
                <a href="http://localhost:8080/api/sessions/recover-form">Recuperar</a>

                <p>Nota: Este es un mensaje de prueba.</p>
            `
        })
        
        console.log(result);
        response.json({status: "success", message: "Correo enviado"});
    }
    catch(error) {
        console.log(error);
        response.json({status: "error", message: "Correo no enviado (error)"});
    }
});

router.get("/logout", (request, response) => { 
    response.clearCookie("cookieToken").redirect("/api/sessions/login");
});

router.get("/current", authenticate("currentStrategy"), usersController.getUserCurrent);

export { router as sessionsRouter };