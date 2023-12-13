
import { Server } from "socket.io";
import { chatService } from "../repository/index.js";
import { productsService } from "../repository/index.js";

// chat socket

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

    sendMessages(object) {
        this.socket.emit("messages", object);                
    }

    async addMessage(message) {
        try {
            const messageInfo = {
                user: "User",
                message: message,
            };
    
            await chatService.addMessage(messageInfo);
            this.messages.push(messageInfo);

            this.socket.emit("messages-update", messageInfo);
        }
        catch(error) {
            console.error("Error: " + error);
        }
    }

    async getProducts(localSocket) {
        this.products = await productsService.getProducts();
        localSocket.emit("products", this.products);
    }
}

