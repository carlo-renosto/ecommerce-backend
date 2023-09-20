// npm run start

// npm i express
// npm i express express-handlebars
// npm i socket.io
import express from "express";
import { Server } from "socket.io";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import path from "path";

const port = 8080;
const app = express(); 

// server http
const http_server = app.listen(port, () => console.log("Servidor en ejecucion (https//localhost:8080)"));

// server socket
export const socket_server = new Server(http_server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);
