
import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";
import { cartsController } from "../controller/carts.controller.js";
import { mockProduct } from "../helpers/mock.js";

const router = Router();

router.get("/",  authenticate("jwt-auth"), (request, response) => {
    response.render("home", {user: {email: request.user.email, role: request.user.role}});
});

router.get("/carts", authenticate("jwt-auth"), (request, response) => {
    response.render("carts");
});

router.get("/carts/:cid", authenticate("jwt-auth"), cartsController.getCartView);

router.get("/products", authenticate("jwt-auth"), productsController.getProductsView);

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

router.get("/profile", authenticate("jwt-auth"), (request, response) => {
    response.render("perfil", {user: {email: request.user.email, role: request.user.role}});
});

export { router as viewsRouter };