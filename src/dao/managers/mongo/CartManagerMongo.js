
import { cartsModel } from "./models/carts.models.js";
import { ProductManager } from "./ProductManagerMongo.js"

const ProductManagerM = new ProductManager();

export class CartManager {
    constructor() { 
        this.model = cartsModel;
    }

    async createCart() {
        try {
            const cart = await this.model.create({products: []});

            return cart;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.model.findById(id).populate({path: "products._id", model: "products"});
            if(cart == null) throw new Error("ID inexistente (carrito)");

            const populatedCart = cart.toObject();
            populatedCart.products = populatedCart.products.map(product => ({product: product._id, quantity: product.quantity}));

            return populatedCart;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async updateCart(cid, cartProducts) {
        try {
            var cart = await this.model.findById(cid);
            if(cart == null) throw new Error("ID inexistente (carrito)");

            cart.products = [...cart.products, ...cartProducts];

            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            
            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async updateCartProduct(cid, pid) {
        try {
            var cart = await this.model.findById(cid);
            if(cart == null) throw new Error("ID inexistente (carrito)");

            const product = await ProductManagerM.getProductById(pid);
            if(product == null) throw new Error("ID inexistente (producto)");
   
            var index = cart.products.findIndex(prod => prod._id == pid);
            if(index == -1) {
                cart.products.push({_id: pid, quantity: 1});
                index = 0;
            }
            else {
                cart.products[index].quantity++;
            }

            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async updateCartProductQuantity(cid, pid, quantity) {
        try {
            var cart = await this.model.findById(cid);
            if(cart == null) throw new Error("ID inexistente (carrito)");

            const product = await ProductManagerM.getProductById(pid);
            if(product == null) throw new Error("ID inexistente (producto)");
   
            var index = cart.products.findIndex(prod => prod._id == pid);
            if(index == -1) {
                cart.products.push({_id: pid, quantity: quantity});
                index = 0;
            }
            else {
                cart.products[index].quantity = quantity;
            }

            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async deleteCart(cid) {
        try {
            var cart = await this.model.findById(cid);
            if(cart == null) throw new Error("ID inexistente (carrito)");

            cart.products = [];

            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async deleteCartProduct(cid, pid) {
        try {
            var cart = await this.model.findById(cid);
            if(cart == null) throw new Error("ID inexistente (carrito)");

            const product = await ProductManagerM.getProductById(pid);
            if(product == null) throw new Error("ID inexistente (producto)");

            var index = cart.products.findIndex(prod => prod._id == pid);
            if(index == -1) throw new Error("ID producto no encontrada (carrito)");

            cart.products = cart.products.filter(prod => prod._id.toString() !== pid);
                
            await this.model.findByIdAndUpdate(cid, cart);

            const cartUpdated = await this.model.findById(cid);
            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }
}

export { CartManager as CartManagerMongo };