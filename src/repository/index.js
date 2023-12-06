
import { cartsRepository } from "./repositories/cart.repository.js";
import { productsRepository } from "./repositories/product.repository.js";
import { chatRepository } from "./repositories/chat.repository.js";
import { usersRepository } from "./repositories/user.repository.js";

export const cartsService = new cartsRepository();
export const productsService = new productsRepository();
export const chatService = new chatRepository();
export const usersService = new usersRepository();