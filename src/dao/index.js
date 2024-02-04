
import  __dirname from "../dirname.js";

import { productManagerMongo } from "./managers/mongo/product.mongo.js";
import { cartManagerMongo } from "./managers/mongo/cart.mongo.js";
import { chatManagerMongo } from "./managers/mongo/chat.mongo.js";
import { userManagerMongo } from "./managers/mongo/user.mongo.js";
import { ticketManagerMongo } from "./managers/mongo/ticket.mongo.js";

export const productManagerDao = new productManagerMongo();
export const cartManagerDao = new cartManagerMongo();
export const chatManagerDao = new chatManagerMongo();
export const userManagerDao = new userManagerMongo();
export const ticketManagerDao = new ticketManagerMongo();
