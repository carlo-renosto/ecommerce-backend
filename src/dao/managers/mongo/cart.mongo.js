
import { cartsModel } from "../../models/carts.models.js";
import { logger } from "../../../config/configLogger.js";
import { customError } from "../../../repository/errors/customError.service.js";
import { invalidIdError } from "../../../repository/errors/invalidIdError.js";
import { duplicatedIdError } from "../../../repository/errors/duplicatedIdError.js";

export class cartManagerMongo {
    constructor() { 
        this.model = cartsModel;
    }

    async createCart(uid) {
        try {
            const cart = await this.model.create({_uid: uid, products: []});

            return cart;
        }
        catch(error) {
            var errorD = customError.createError(duplicatedIdError("Create cart error"), 0);
            
            const errorLog = {
                name: errorD.message,
                code: errorD.errorCode,
                cause: errorD.cause
            }
            
            logger.error("Error (cart.mongo.js): " + JSON.stringify(errorLog, null, 1));
            return -1;
        }
    }

    async getCartById(id, isPopulated=true) {
        try {
            var cart;

            if(isPopulated) {
                cart = await this.model.findById(id).populate({path: "products._id", model: "products"});
                if(cart == null) customError.createError(invalidIdError("Get cart error"));
                
                cart = cart.toObject();

                cart.products = cart.products.map(product => ({product: product._id, quantity: product.quantity}));
            }
            else {
                cart = await this.model.findById(id).lean();
                if(cart == null) customError.createError(invalidIdError("Get cart error"));
            }

            return cart;
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

    async getCartByUid(uid, isPopulated=true) {
        try {
            var cart;

            if(isPopulated) {
                cart = await this.model.findOne({_uid: uid}).populate({path: "products._id", model: "products"});
                if(cart == null) customError.createError(invalidIdError("Get cart error"));

                cart = cart.toObject();
                cart.products = cart.products.map(product => ({product: product._id, quantity: product.quantity}));
            }
            else {
                cart = await this.model.findOne({_uid: uid}).lean();
                if(cart == null) customError.createError(invalidIdError("Get cart error"));
            }
        
            return cart;
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

    async updateCart(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            if(cartUpdated == null) customError.createError(invalidIdError("Get cart error"));
            
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

    async updateCartProduct(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);
            
            const cartUpdated = await this.model.findById(cid);
            if(cartUpdated == null) customError.createError(invalidIdError("Get cart error"));


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

    async deleteCart(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            if(cartUpdated == null) customError.createError(invalidIdError("Get cart error"));

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

    async deleteCartProduct(cid, cart) {
        try {   
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            if(cartUpdated == null) customError.createError(invalidIdError("Get cart error"));

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

    async purchaseCart(cid, cart) {
        try {
            const cartUpdated = await this.model.findByIdAndUpdate(cid, cart);
            if(cartUpdated == null) customError.createError(invalidIdError("Get cart error"));

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
    
}
