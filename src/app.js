// npm run start

// npm i express
// npm i express express-handlebars
// npm i socket.io
// npm i mongoose
import express from "express";
import { Server } from "socket.io";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { connectDB } from "./config/dbconnection.js";
import { ChatManagerM } from "./dao/index.js";
import path from "path";

const port = 8080;
const app = express(); 
connectDB();

// server http
const http_server = app.listen(port, () => console.log("Servidor en ejecucion (https//localhost:8080)"));

// server socket
export const socket_server = new Server(http_server);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({extname: '.hbs', runtimeOptions: {allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault: true}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

var messages = [];

socket_server.on("connection", async(socket) => {
    console.log("Cliente conectado (ID " + socket.id + ")");
    
    try {
        messages = await ChatManagerM.getMessages();
        socket.emit("messages", messages);
    }
    catch(error) {
        console.error("Error: " + error);
    }   

    socket.on("message_add", async(message) => {
        try {
            const messageInfo = {
                user: "User",
                message: message,
            };
    
            await ChatManagerM.addMessage(messageInfo);
            messages.push(messageInfo);

            socket_server.emit("messages-update", messageInfo);
        }
        catch(error) {
            console.error("Error: " + error);
        }
    });
});

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);
