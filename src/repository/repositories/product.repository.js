
import { productManagerDao } from "../../dao/index.js";

import { logger } from "../../config/configLogger.js";

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
            throw error;
        }
    }

    async getProducts(limit=0, page=0, query="", sort=0) {
        try {
            const products = await this.dao.getProducts(limit, page, query, sort);
            return products;
        }
        catch(error) {
            throw error;
        }
    }

    async getProductsOwner(owner) {
        try {
            const products = await this.dao.getProductsOwner(owner);
            return products;
        }
        catch(error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.dao.getProductById(id);
            return product;
        }   
        catch(error) {
            throw error;
        }
    }

    async updateProduct(id, productInfo) {
        try {
            const product = await this.dao.updateProduct(id, productInfo);
            return product;
        }
        catch(error) {
            throw error;
        }
    }

    async deleteProduct(id, uid=0, isUserPremium=false) {
        try {
            if(isUserPremium) {
                const product = await this.dao.getProductById(id);

                if(uid != product.owner) throw new Error("Permisos insuficientes");
            }

            await this.dao.deleteProduct(id);
        }
        catch(error) {
            logger.error("Error (product.repository.js): " + error.message);
            throw error;
        }
    }
}