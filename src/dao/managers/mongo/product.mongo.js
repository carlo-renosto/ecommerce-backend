
import { productsModel } from "../../models/products.models.js";
import { logger } from "../../../config/configLogger.js";
import { customError } from "../../../repository/errors/customError.service.js";
import { invalidIdError } from "../../../repository/errors/invalidIdError.js";
import { invalidCodeError } from "../../../repository/errors/invalidCodeError.js";
import { duplicatedCodeError } from "../../../repository/errors/duplicatedCodeError.js";

export class productManagerMongo {
    constructor() {
        this.model = productsModel;
    }

    async createProduct(productInfo) {
        try {
            const productExisting = await this.getProductByCode(productInfo.code);
            if(productExisting) customError.createError(duplicatedCodeError("Create product error"));

            const product = await this.model.create(productInfo);
            return product;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async getProducts(limit=0, page=0, query="", sort=0) {
        var products = [];

        try {
            if(limit == 0 && page == 0 && query == "" && sort == 0) { 
                products = await this.model.find().lean();
            }
            else {  
                var options = {
                    lean: true,
                    limit: limit,
                    page: page,
                };
                if(query != "") options = {...options, select: query};
                if(sort != 0) options = {...options, sort: { price: sort }};

                products = await this.model.paginate({}, options);
            }
            
            return products;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.model.findById(id);
            if(product == null) customError.createError(invalidIdError("Get product error"));

            return product;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async getProductByCode(code) {
        try {
            const product = await this.model.findOne({code: code});

            return product;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async updateProduct(id, productInfo) {
        try {
            await this.model.findByIdAndUpdate(id, productInfo);

            const product = await this.model.findById(id);
            if(product == null) customError.createError(invalidIdError("Get product error"));

            return product;
        }
        catch {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await this.model.findByIdAndDelete(id);
            if(product == null) customError.createError(invalidIdError("Get product error"));
        }
        catch {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (product.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }
}