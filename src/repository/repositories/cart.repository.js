
import { cartManagerDao } from "../../dao/index.js";
import { productManagerDao } from "../../dao/index.js";
import { userManagerDao } from "../../dao/index.js";
import { ticketManagerDao } from "../../dao/index.js";

import { logger } from "../../config/logger.js";

export class cartsRepository {
    constructor() {
        this.dao = cartManagerDao;
        this.daoP = productManagerDao;
        this.daoU = userManagerDao;
        this.daoT = ticketManagerDao;
    }

    async createCart(uid) {
        try {
            await this.daoU.getUserById(uid);

            const cart = await this.dao.createCart(uid);
            return cart;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.dao.getCartById(id);

            return cart;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async getCartByUid(uid) {
        try {
            const cart = await this.dao.getCartByUid(uid);

            return cart;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async updateCart(cid, cartProducts) {
        try {
            var cart = await this.dao.getCartById(cid, false);
            if(cart == -1) return -1;
            
            cart.products = [...cart.products, ...cartProducts];

            const cartUpdated = await this.dao.updateCart(cid, cart);
            return cartUpdated;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async updateCartProduct(cid, pid, quantity) {
        try {
            var cart = await this.dao.getCartById(cid, false);
            if(cart == -1) return -1;

            await this.daoP.getProductById(pid);
   
            var index = cart.products.findIndex(prod => prod._id == pid);

            if(index == -1) {
                cart.products.push({_id: pid, quantity: quantity});
                index = 0;
            }
            else {
                cart.products[index].quantity += quantity;
            }

            const cartUpdated = await this.dao.updateCartProduct(cid, cart);
            return cartUpdated;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async deleteCart(cid) {
        try {
            var cart = await this.dao.getCartById(cid, false);
            if(cart == -1) return -1;

            cart.products = [];

            const cartCleared = await this.dao.deleteCart(cid, cart);
            return cartCleared;
        }
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }

    async deleteCartProduct(cid, pid) {
        try {
            var cart = await this.dao.getCartById(cid, false);
            if(cart == -1) return -1;

            var product = await this.daoP.getProductById(pid);
            if(product == -1) return -1;

            var index = cart.products.findIndex(prod => prod._id == pid);
            if(index == -1) return -1;

            cart.products = cart.products.filter(prod => prod._id.toString() !== pid);

            const cartUpdated = await this.dao.deleteCartProduct(cid, cart);
            return cartUpdated;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (cart.mongo.js): " + JSON.stringify(errorLog, null, 1));
            return -1;
        }
    }

    async purchaseCart(cid) {
        try {
            const cart = await this.dao.getCartById(cid);
            if(cart == -1) return -1;

            var priceTotal = 0;

            const updatedProducts = await Promise.all(cart.products.map(async(product) => {

                var productStore = await this.daoP.getProductById(product.product._id);

                if(product.product.stock >= product.quantity) {
                    productStore.stock -= product.quantity;
    
                    await this.daoP.updateProduct(productStore.id, productStore);

                    const price = product.product.price * product.quantity;
                    priceTotal += price;

                    return null; 
                } 
                else {
                    return product; 
                }
            }));

            cart.products = updatedProducts.filter(product => product != null);
            cart.products = cart.products.map(product => ({_id: product.product._id, quantity: product.quantity}));

            await this.dao.purchaseCart(cid, cart);

            const user = await this.daoU.getUserById(cart._uid);
            const ticket = await this.daoT.createTicket(priceTotal, user.email);
            return ticket;
        }   
        catch(error) {
            logger.error("Error (cart.repository.js): " + error.message);
        }
    }
}