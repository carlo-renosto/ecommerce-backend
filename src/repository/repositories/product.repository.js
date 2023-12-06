
import { productManagerDao } from "../../dao/index.js";

export class productsRepository {
    constructor() {
        this.dao = productManagerDao;
    }

    async createProduct(productInfo) {
        try {
            const product = await this.dao.createProduct(productInfo);
            return product;
        }
        catch(error) {
            console.log("Error (product.repository.js): " + error.message);
        }
    }

    async getProducts(limit=0, page=0, query="", sort=0) {
        try {
            const products = await this.dao.getProducts(limit, page, query, sort);
            return products;
        }
        catch(error) {
            console.log("Error (product.repository.js): " + error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await this.dao.getProductById(id);
            return product;
        }   
        catch(error) {
            console.log("Error (product.repository.js): " + error.message);
        }
    }

    async updateProduct(id, productInfo) {
        try {
            const product = await this.dao.updateProduct(id, productInfo);
            return product;
        }
        catch(error) {
            console.log("Error (product.repository.js): " + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            await this.dao.deleteProduct(id);
        }
        catch(error) {
            console.log("Error (product.repository.js): " + error.message);
        }
    }
}