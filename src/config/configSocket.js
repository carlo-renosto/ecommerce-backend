
import { Server } from "socket.io";
import { chatService } from "../repository/index.js";
import { productsService } from "../repository/index.js";

export class socketServer {
    constructor(httpServer) {
        this.socket = new Server(httpServer);
        this.products = [];

        this.socket.on("connection", async(socket) => {
            console.log("Server socket abierto (ID " + socket.id + ")");
            
            socket.on("request_messages", async () => {
                const messages = await chatService.getMessages();
                const users = messages.map(message => ({ name: message.user, message: message.message }));
                this.sendMessages({users})
            });

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

