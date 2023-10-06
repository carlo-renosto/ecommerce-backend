
import fs from "fs";
import { ProductManager } from "./ProductManagerFiles.js"

const productManager = new ProductManager("./products.json");

export class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
    };

    async fileExists() {
        try {
            fs.access(this.path, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    }

    fileIsEmpty(jsonData) {
        return Array.isArray(jsonData) && jsonData.length === 0;
    }

    async addCart() {
        var result = 0;
        try {
            const newId = await this.getLatestId();
    
            const newCart = {
                id: newId,
                products: []
            };

            result = await this.addCartFile(newCart);
            return 1;
        }
        catch(error) {
            if(result == -1) {
                return -1;
            }
            return 0;
        }
    }

    async addCartFile(cart) {
        try {
            if(this.fileExists()) {
                await this.getCarts();

                this.carts.push(cart);

                await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"));
                return 1;
            }
            else {
                throw new Error("file-missing");
            }
        }
        catch(error) {
            if(Error(error).message.includes("file-missing")) {
                return -1;
            }
            return 0;
        }
    }

    async addProductToCart(cid, pid) {
        var result = 0;
        try {
            if(this.fileExists()) {
                var cart = await this.getCartById(cid);
                if(cart.id == undefined) {
                    throw new Error("cart-missing");
                }
                var prod = await productManager.getProductById(pid);
                if(prod.id == undefined) {
                    throw new Error("product-missing");
                }

                result = await this.updateCartFile(cart, pid);
                return result;
            }
            else {
                throw new Error("file-missing"); 
            }
        }
        catch(error) {
            if(Error(error).message.includes("file-missing") || result == -1) {
                return -1;
            }
            if(Error(error).message.includes("cart-missing")) {
                return -2;
            }
            if(Error(error).message.includes("product-missing")) {
                return -3;
            }
            return 0;
        }
    }

    async updateCartFile(cart, pid) {
        try {
            if(this.fileExists()) {
                await this.getCarts();

                var index = cart.products.findIndex(prod => prod.id == pid);
                if(index == -1) {
                    cart.products.push({id: pid, quantity: 1});
                    index = 0;
                }
                else {
                    cart.products[index].quantity++;
                }

                
                this.carts[index] = {...this.carts[index], ...cart}
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t"));
                return 1;
            }
            else {
                throw new Error("file-missing");
            }
        }
        catch(error) {
            if(Error(error).message.includes("file-missing")) {
                return -1;
            }
            return 0;
        }
    }

    async getCarts() {
        try {
            if(this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                
                if(content.length === 0) {
                    this.carts = [];
                } else {
                    const contentJson = JSON.parse(content);
                    this.carts = contentJson;
                }
    
                return this.carts;
            } 
            else {
                throw new Error("file-missing");
            }
        } 
        catch(error) {
            if(Error(error).message.includes("file-missing")) {
                return -1;
            }
            return 0;
        }
    }

    async getCartById(id) {
        try {
            if(this.fileExists()) {
                await this.getCarts();
                
                if(this.fileIsEmpty(this.carts)) {
                    throw new Error("file-empty");
                }

                const cart = this.carts.find(cart => cart.id === id);
                
                if(!cart) {
                    throw new Error("cart-missing");
                }

                return cart;
            }
            else {
                throw new Error("file-missing");
            }
        }
        catch(error) {
            if(Error(error).message.includes("file-missing")) {
                return -1;
            }
            if(Error(error).message.includes("file-empty")) {
                return -2;
            }
            if(Error(error).message.includes("cart-missing")) {
                return -3;
            }
            return 0;
        }
    }

    async getLatestId() {
        try {
            if(this.fileExists()) {
                await this.getCarts();

                if(this.fileIsEmpty(this.carts)) {
                    return 1;
                }
                else {
                    return this.carts[this.carts.length-1].id + 1;
                }
            }
            else {
                throw new Error("file-missing");
            }
        }
        catch(error) {
            if(Error(error).message.includes("file-missing")) {
                return -1;
            }
            return 0;
        }
    }
}

export { CartManager as CartManagerFiles };