// npm run start

import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbconnection.js";

import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import path from "path";

import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import { socketServer } from "./sockets/socketserver.js";

import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { chatsRouter } from "./routes/chats.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { errorHandler } from "./middlewares/errorhandler.js";

const port = 8080; 
const app = express(); 
connectDB();

// server http
const http_server = app.listen(port, () => console.log("Servidor en ejecucion (https//localhost:8080)"));

// socket
export const socket_server = new socketServer(http_server);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({extname: '.hbs', runtimeOptions: {allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault: true}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

initializePassport();
app.use(passport.initialize());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/sessions", sessionsRouter);
app.use(viewsRouter);

app.use(errorHandler);