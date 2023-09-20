
import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";
import { socket_server } from "../app.js"

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async(request, response) => {
    const products = await productManager.getProducts();
    response.render("home", { products });
});

router.get("/realtimeproducts", async(request, response) => {
    const products = await productManager.getProducts();

    response.render("realtimeproducts");

    socket_server.on("connection", (socket) => {
        console.log("Cliente conectado (ID " + socket.id + ")");
        socket.emit("products", products);
    });
});

export { router as viewsRouter };