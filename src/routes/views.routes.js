
import { Router } from "express";
import { ProductManagerM } from "../dao/index.js";
import { ChatManagerM } from "../dao/index.js";
import { socket_server } from "../app.js"

const router = Router();

router.get("/", async(request, response) => {
    const products = await ProductManagerM.getProducts();

    response.render("home", { products });
});

router.get("/chat", async(request, response) => {
    response.render("chat");

    const messages = await ChatManagerM.getMessages();

    socket_server.on("connection", (socket) => {
        console.log("Cliente conectado (ID " + socket.id + ")");
        socket.emit("messages", messages);
    });
});

router.post("/chat", async(request, response) => { 
    try {
        const messageInfo = {
            user: "User",
            message: request.body.message
        }

        await ChatManagerM.addMessage(messageInfo);

        const messages = await ChatManagerM.getMessages();
        socket_server.emit("messages", messages);
    }
    catch(error) {
        response.json({status: "error", message: "Mensaje no agregado (error)"});
    }
});

router.get("/realtimeproducts", async(request, response) => {
    const products = await ProductManagerM.getProducts();

    response.render("realtimeproducts");

    socket_server.on("connection", (socket) => {
        console.log("Cliente conectado (ID " + socket.id + ")");
        socket.emit("products", products);
    });
});

export { router as viewsRouter };