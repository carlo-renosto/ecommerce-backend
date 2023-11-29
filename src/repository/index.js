
import { cartsRepository } from "./repositories/carts.repository.js";
import { productsRepository } from "./repositories/products.repository.js";
import { chatRepository } from "./repositories/chat.repository.js";
import { usersRepository } from "./repositories/users.repository.js";

export const cartsService = new cartsRepository();
export const productsService = new productsRepository();
export const chatService = new chatRepository();
export const usersService = new usersRepository();