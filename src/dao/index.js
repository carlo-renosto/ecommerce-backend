import { ProductManagerFiles } from "./files/ProductManagerFiles.js";
import { CartManagerFiles } from "./files/CartManagerFiles.js";
import { ProductManagerMongo } from "./mongo/ProductManagerMongo.js";
import { CartManagerMongo } from "./mongo/CartManagerMongo.js";
import { ChatManagerMongo } from "./mongo/ChatManagerMongo.js";

import { __dirname } from "../utils.js";
import path from "path";

export const ProductManager = new ProductManagerFiles(path.join(__dirname,"/files/products.json"));
export const ProductManagerM = new ProductManagerMongo();
export const CartManager = new CartManagerFiles(path.join(__dirname,"/files/carts.json"));
export const CartManagerM = new CartManagerMongo();
export const ChatManagerM = new ChatManagerMongo();
