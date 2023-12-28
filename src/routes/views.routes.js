
import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { usersController } from "../controller/users.controller.js";
import { mockProduct } from "../utils.js";

const router = Router();

router.get("/", authenticate("jwt-auth"), (request, response) => {
    response.render("home", {user: request.user});
});

router.get("/carts", authenticate("jwt-auth"), (request, response) => {
    response.render("carts");
});

router.get("/products", authenticate("jwt-auth"), (request, response) => {
    response.render("products");
});

router.get("/realtimeproducts", authenticate("jwt-auth"), (request, response) => {
    response.render("realtimeproducts");
});

router.get("/mockingproducts", (request, response) => {
    var products = [];

    for(var i=1;i<=100;i++) {
        products.push(mockProduct());
    }

    response.json({message: "success", data: products});
});

router.get("/profile", authenticate("jwt-auth"), authenticate("currentStrategy"), usersController.getUserCurrent);

export { router as viewsRouter };