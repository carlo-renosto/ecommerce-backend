
import { Server } from "socket.io";
import { productsService } from "../repository/index.js";

export class socketServer {
    constructor(httpServer) {
        this.socket = new Server(httpServer);
        this.products = [];

        this.socket.on("connection", async(socket) => {
            console.log("Socket abierto (ID " + socket.id + ")");
            
            socket.on("request_products", async() => {
                await this.getProducts(socket);
            });
        });
    }

    sendMessages(messages) {
        this.socket.emit("messages", messages);                
    }

    addMessage(message) {
        this.socket.emit("message-add", message);
    }

    async getProducts(localSocket) {
        this.products = await productsService.getProducts();
        localSocket.emit("products", this.products);
    }
}

