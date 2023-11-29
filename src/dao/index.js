
import { ProductManagerMongo } from "./managers/mongo/ProductManagerMongo.js";
import { CartManagerMongo } from "./managers/mongo/CartManagerMongo.js";
import { ChatManagerMongo } from "./managers/mongo/ChatManagerMongo.js";
import { UserManager } from "./managers/mongo/UserManagerMongo.js";

import { __dirname } from "../utils.js";

export const productManagerDao = new ProductManagerMongo();
export const cartManagerDao = new CartManagerMongo();
export const chatManagerDao = new ChatManagerMongo();
export const userManagerDao = new UserManager();
