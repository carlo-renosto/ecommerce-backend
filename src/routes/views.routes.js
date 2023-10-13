
import { Router } from "express";
import { ProductManagerM } from "../dao/index.js";
import { CartManagerM } from "../dao/index.js";
import { socket_server } from "../app.js"

const router = Router();

router.get("/", async(request, response) => {
    const products = await ProductManagerM.getProducts();

    response.render("home", { products });
});

router.get("/chat", async(request, response) => {
    response.render("chat");
});

router.get("/products", async(request, response) => {
    const products = await ProductManagerM.getProducts(10, 1);

    response.render("products", products);
});

router.get("/realtimeproducts", async(request, response) => {
    const products = await ProductManagerM.getProducts();

    response.render("realtimeproducts");

    socket_server.on("connection", (socket) => {
        console.log("Cliente conectado (ID " + socket.id + ")");
        socket.emit("products", products);
    });
});

router.get("/carts", async(request, response) => {
    

    response.render("carts");
});

router.get("/carts/:cid", async(request, response) => {
    try {
        const cid = request.params.cid;

        const cart = await CartManagerM.getCartById(cid);
        response.render("carts", cart);
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no obtenido (error)"});
    }
});

export { router as viewsRouter };