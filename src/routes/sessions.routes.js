
import { Router } from "express";
import  passport from "passport";
import { config } from "../config/config.js";

const router = Router();

router.get("/login", (request, response) => {
    response.render("login");
});

router.get("/signup", (request, response) => {
    response.render("signup");
});

router.post("/user-login", passport.authenticate("loginLocalStrategy", {failureRedirect: "/api/sessions/fail-login"}), async(request, response) => {
    response.redirect("/profile");
});

router.get("/user-login-github", passport.authenticate("loginGithubStrategy"));

router.get(`${config.github.callback_url}-login`, passport.authenticate("loginGithubStrategy",  {failureRedirect: "/api/sessions/fail-login"}), async(request, response) => {
    response.redirect("/profile");
});

router.get("/fail-login", (request, response) => {
    response.render("login", {error: "Sesion no iniciada (error)"});
});

router.post("/user-signup", passport.authenticate("signupLocalStrategy", {failureRedirect: "/api/sessions/fail-signup"}), async(request, response) => {
    response.render("login", {message: "Usuario registrado"});
});

router.get("/user-signup-github", passport.authenticate("signupGithubStrategy"));

router.get(config.github.callback_url, passport.authenticate("signupGithubStrategy",  {failureRedirect: "/api/sessions/fail-signup"}), async(request, response) => {
    response.redirect("/profile");
});

router.get("/fail-signup", (request, response) => {
    response.render("signup", {error: "Usuario no registrado (error)"});
});

router.get("/logout", async(request, response)=>{
    try {
        request.session.destroy(err => {
            if(err) {
                return response.render("login", { error: "Sesion no cerrada (error)"});
            }

            response.redirect("/");
        });
    } 
    catch(error) {
        response.render("signup", { error: "Usuario no registrado (error)"});
    }
});

export { router as sessionsRouter };