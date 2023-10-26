
import { Router } from "express";
import { ProductManagerM } from "../dao/index.js";
import { CartManagerM } from "../dao/index.js";
import { socket_server } from "../app.js"

const router = Router();

const hasUser = (request, response, next) => {
    if(!request.user?.email) {
        response.redirect("/api/sessions/login")
    }
    else {
        next();
    }
}

router.get("/",  hasUser, async(request, response) => {
    response.render("home", {user: {email: request.user.email, role: request.user.role}});
});

router.get("/chat", hasUser, async(request, response) => {
    response.render("chat");
});

router.get("/carts", hasUser, async(request, response) => {
    response.render("carts");
});

router.get("/carts/:cid", hasUser, async(request, response) => {
    try {
        const cid = request.query.cid || request.params.cid;

        const cart = await CartManagerM.getCartById(cid);
        response.render("carts", cart);
    }
    catch(error) {
        response.render("carts");
    }
});

router.get("/products", hasUser, async(request, response) => {
    const products = await ProductManagerM.getProducts(10, 1);

    const object = {
        products: products,
        email: request.user.email,
        role: request.user.role
    }

    response.render("products", {object});
});

router.get("/realtimeproducts", hasUser, async(request, response) => {
    const products = await ProductManagerM.getProducts();

    response.render("realtimeproducts");

    socket_server.on("connection", (socket) => {
        console.log("Cliente conectado (ID " + socket.id + ")");
        socket.emit("products", products);
    });
});

router.get("/profile", hasUser, (request, response) => {
    response.render("perfil", {user: {email: request.user.email, role: request.user.role}});
});

export { router as viewsRouter };