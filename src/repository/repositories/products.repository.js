
import { productManagerDao } from "../../dao/index.js";

export class productsRepository {
    constructor() {
        this.dao = productManagerDao;
    }

    async createProduct(productInfo) {
        const product = await this.dao.createProduct(productInfo);
        return product;
    }

    async getProducts(limit=0, page=0, query="", sort=0) {
        const products = await this.dao.getProducts(limit, page, query, sort);
        return products;
    }

    async getProductById(id) {
        const product = await this.dao.getProductById(id);
        return product;
    }

    async updateProduct(id, productInfo) {
        const product = await this.dao.updateProduct(id, productInfo);
        return product;
    }

    async deleteProduct(id) {
        await this.dao.deleteProduct(id);
    }
}