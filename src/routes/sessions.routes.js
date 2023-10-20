
import { Router } from "express";
import { usersModel } from "../dao/mongo/models/users.models.js";

const router = Router();

// Rutas de usuario

router.get("/login", (request, response) => {
    response.render("login");
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
        response.render("signin", { error: "Usuario no registrado (error)"});
    }
});

router.get("/signin", (request, response) => {
    response.render("signin");
});

router.post("/user-login", async(request, response) => {
    try {
        const userInfo = request.body;
        const user = await usersModel.findOne({email: userInfo.email});

        if(!user) {
            return response.render("login", { error: "Usuario no registrado" });
        }
        if(user.password !== userInfo.password) {
            return response.render("login", { error: "Contraseña incorrecta" });
        }

        request.session.email = user.email;
        request.session.role = user.role;
        response.redirect("/products");
    } 
    catch(error) {
        response.render("login", { error:"Sesion no iniciada (error)" });
    }
});

router.post("/user-signin", async(request, response) => {
    try {
        const userInfo = request.body;

        userInfo.role = userInfo.email == "adminCoder@coder.com" && userInfo.password == "adminCod3r123" ? "admin" : "user";
        
        await usersModel.create(userInfo);
        response.render("login", { message: "Usuario registrado" });
    } 
    catch(error) {
        response.render("signin", { error: "Usuario no registrado (error)" });
    }
});

export { router as sessionsRouter };