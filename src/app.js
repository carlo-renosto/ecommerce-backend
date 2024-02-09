import express from "express";
import passport from "passport";
import hbs from "handlebars";
import swaggerUI from "swagger-ui-express";

import cookieParser from "cookie-parser";
import { engine } from 'express-handlebars';
import path from "path";

import  __dirname from "./dirname.js";

import { connectDB } from "./config/configDB.js";
import { initializePassport } from "./config/configPassport.js";
import { logger } from "./config/configLogger.js";
import { swaggerSpecs } from './config/configSwagger.js';
import { socketServer } from "./config/configSocket.js";

import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { chatsRouter } from "./routes/chats.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

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

hbs.registerHelper('isNotAdmin', function(role) { 
    return role !== "admin";
});

initializePassport();
app.use(passport.initialize());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/docs", swaggerUI.serve , swaggerUI.setup(swaggerSpecs));
app.use(viewsRouter);

app.get("/loggerTest", (request, response) => {
    logger.debug("Debug message");
    logger.http("HTTP message");
    logger.warn("Warn message");
    logger.error("Error message");
    logger.fatal("Fatal message");
    response.sendStatus(204);
});

export { app };