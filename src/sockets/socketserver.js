
import { Server } from "socket.io";
import { chatService } from "../services/chat.service.js";
import { productsService } from "../services/products.service.js";

// chat socket

export function socketServer(http_server) {
    
    const socket_server = new Server(http_server);
    var messages = [];
    var products = [];

    socket_server.on("connection", async(socket) => {
        console.log("Socket abierto (ID " + socket.id + ")");
        
        socket.on("request_messages", async() => {
            const service = new chatService(); 

            messages = await service.getMessages();
            socket.emit("messages", messages);
        });

        socket.on("request_products", async() => {
            const service = new productsService(); 

            products = await service.getProducts();
            socket.emit("products", products);
        });

        socket.on("message_add", async(message) => {
            try {
                const service = new chatService(); 

                const messageInfo = {
                    user: "User",
                    message: message,
                };
        
                await service.addMessage(messageInfo);
                messages.push(messageInfo);

                socket_server.emit("messages-update", messageInfo);
            }
            catch(error) {
                console.error("Error: " + error);
            }
        });
    });

    return socket_server;
} 

