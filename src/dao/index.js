
import { ProductManagerMongo } from "./mongo/ProductManagerMongo.js";
import { CartManagerMongo } from "./mongo/CartManagerMongo.js";
import { ChatManagerMongo } from "./mongo/ChatManagerMongo.js";

import { __dirname } from "../utils.js";

export const ProductManagerM = new ProductManagerMongo();
export const CartManagerM = new CartManagerMongo();
export const ChatManagerM = new ChatManagerMongo();
