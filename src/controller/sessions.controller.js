
import { userService } from "../repository/index.js";

import { generateTokenEmail, sendPwChangeEmail, verifyTokenEmail } from "../config/configGmail.js";

import { generateToken } from "../utils/token.js";
import { createPasswordHash } from "../utils/hash.js";

export class sessionsController {
    static login = (request, response) => {
        response.render("login");
    }

    static signup = (request, response) => {
        response.render("signup");
    }

    static loginUser = (request, response) => {
        const token = generateToken(request.user);
        response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
    }

    static loginUserGithub = (request, response) => {
        const token = generateToken(request.user);
        response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
    }

    static signupUser = (request, response) => {
        response.render("login", {message: "Usuario registrado"});
    }

    static signupUserGithub = (request, response) => {
        if(request.isAuthenticated() && request.user) {
            const token = generateToken(request.user);
            response.cookie("cookieToken", token, {httpOnly: true}).redirect("/profile");
        }
        else {
            response.render("signup", {error: "Email ya registrado"});
        }
    }

    static logout = async(request, response) => {
        try {
            response.clearCookie("cookieToken").redirect("/api/sessions/login");
    
            const user = await userService.getUserById(request.user.id);
            user.last_connection = new Date(Date.now());
    
            await userService.updateUser(user._id, user);
        }
        catch(error) {
            response.json({status: "error", message: "Sesión no finalizada (error)"});
        }
    }

    static recover = (request, response) => {
        response.render("recover");
    }

    static recoverForm = (request, response) => {
        const token = request.query.token;
        response.render("recoverForm", {token});
    }

    static recoverFormSend = async(request, response) => {
        try {
            const email = request.body.email;
            const emailToken = generateTokenEmail(email, 10 * 60);
    
            await sendPwChangeEmail(request, email, emailToken);
    
            response.render("login", {message: "Correo enviado."});
        }
        catch(error) {
            response.render("login", {error: "Correo no enviado (error)"});
        }
    }

    static recoverPasswordSend = async(request, response) => {
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
            response.render("login", {error: "Contraseña no reestablecida (error)"});
        }
    }
}