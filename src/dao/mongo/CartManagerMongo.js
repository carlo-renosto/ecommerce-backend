
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
            const cart = await this.model.findById(id);
            if(cart == null) throw new Error("ID inexistente");

            return cart;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async updateCart(cid, pid) {
        try {
            const cart = await this.model.findById(cid);
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

            const cartUpdated = await this.model.findByIdAndUpdate(cid, cart);

            return cartUpdated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }
}

export { CartManager as CartManagerMongo };