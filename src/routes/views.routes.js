
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";
import { cartsController } from "../controller/carts.controller.js";

const router = Router();

router.get("/",  authenticate("jwt-auth"), authorize("user"), async(request, response) => {
    response.render("home", {user: {email: request.user.email, role: request.user.role}});
});

router.get("/chat", authenticate("jwt-auth"), authorize("user"), async(request, response) => {
    response.render("chat");
});

router.get("/carts", authenticate("jwt-auth"), authorize("user"), async(request, response) => {
    response.render("carts");
});

router.get("/carts/:cid", authenticate("jwt-auth"), authorize("user"), cartsController.getCartView);

router.get("/products", authenticate("jwt-auth"), authorize("user"), productsController.getProductsView);

router.get("/realtimeproducts", authenticate("jwt-auth"), authorize("user"), async(request, response) => {
    response.render("realtimeproducts");
});

router.get("/profile", authenticate("jwt-auth"), authorize("user"), (request, response) => {
    response.render("perfil", {user: {email: request.user.email, role: request.user.role}});
});

export { router as viewsRouter };