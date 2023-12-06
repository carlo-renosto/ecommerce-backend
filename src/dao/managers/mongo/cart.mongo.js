
import { cartsModel } from "../../models/carts.models.js";
import { productManagerMongo } from "./product.mongo.js"
import { userManagerMongo } from "./user.mongo.js";
import { ticketManagerMongo } from "./ticket.mongo.js";

const productMongo = new productManagerMongo();
const userMongo = new userManagerMongo();
const ticketMongo = new ticketManagerMongo();


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
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async getCartById(id, isPopulated=true) {
        try {
            var cart;

            if(isPopulated) {
                cart = await this.model.findById(id).populate({path: "products._id", model: "products"});
                cart = cart.toObject();

                cart.products = cart.products.map(product => ({
                    product: product._id, 
                    quantity: product.quantity
                }));
            }
            else {
                cart = await this.model.findById(id).lean();
            }
            
            if(cart == null) throw new Error("CID inexistente");

            return cart;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async getCartByUid(uid, isPopulated=true) {
        try {
            var cart;

            if(isPopulated) {
                cart = await this.model.findOne({_uid: uid}).populate({path: "products._id", model: "products"});

                cart = cart.toObject();
                cart.products = cart.products.map(product => ({product: product._id, quantity: product.quantity}));
            }
            else {
                cart = await this.model.findOne({_uid: uid}).lean();
            }
            
            if(cart == null) throw new Error("UID inexistente");

            return cart;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async updateCart(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            
            return cartUpdated;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async updateCartProduct(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async deleteCart(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async deleteCartProduct(cid, cart) {
        try {   
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            return cartUpdated;
        }
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }

    async purchaseCart(cid, cart) {
        try {
            await this.model.findByIdAndUpdate(cid, cart);
        } 
        catch(error) {
            console.log("Error (cart.mongo.js): " + error.message);
        }
    }
    
}