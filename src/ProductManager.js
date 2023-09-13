
import fs from "fs";

export class ProductManager {
    constructor(path) {
        this.products = [];
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

    async productExists(code) {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                if(this.products.find(prod => prod.code === code)) {
                    return true;
                }
                return false;
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

    productIsEmpty(p) {
        if(p.title == undefined || p.description == undefined || p.code == undefined || p.price == undefined || p.stock == undefined || p.category == undefined)  {
            return true;
        }

        return false;
    }

    async addProduct(product) {
        var result = 0;
        try {
            const isEmpty = this.productIsEmpty(product);
            const exists = await this.productExists(product.code);

            if(isEmpty) {
                throw new Error("product-missing-fields");
            }
            if(exists) {
                throw new Error("product-exists");
            }

            if(product.thumbnails == undefined) {
                product.thumbnails = [];
            }
    
            const newId = await this.getLatestId();
    
            const newProduct = {
                id: newId,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: true,
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails,
            };
            
            result = await this.addProductFile(newProduct);
            return 1;
        }
        catch(error) {
            if(result == -1) {
                return -1;
            }
            if(Error(error).message.includes("product-missing-fields")) {
                return -2;
            }
            if(Error(error).message.includes("product-exists")) {
                return -3;
            }
            return 0;
        }
    }

    async addProductFile(product) {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                this.products.push(product);

                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
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

    async getProducts() {
        try {
            if(this.fileExists()) {
                const content = await fs.promises.readFile(this.path, "utf-8");
                
                if(content.length === 0) {
                    this.products = [];
                } else {
                    const contentJson = JSON.parse(content);
                    this.products = contentJson;
                }
    
                return this.products;
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

    async updateProduct(id, product) {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    throw new Error("file-empty");
                }
                else {
                    var index = this.products.findIndex(prod => prod.id === id);
                    if(index == -1) {
                        throw new Error("product-missing");
                    }
                    if(product.id && product.id != id) {
                        throw new Error("id-modified");
                    }

                    this.products[index] = {...this.products[index], ...product}
     
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                    return 1;
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
            if(Error(error).message.includes("file-empty")) {
                return -2;
            }
            if(Error(error).message.includes("product-missing")) {
                return -3;
            }
            if(Error(error).message.includes("id-modified")) {
                return -4;
            }
            return 0;
        }
    }

    async deleteProduct(id) {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    throw new Error("file-empty");
                }
                else {
                    const product = this.products.find(prod => prod.id === id);

                    if(product) {
                        const productsAux = [];

                        this.products.forEach(prod => {
                            if(prod.id != id) {
                                productsAux.push(prod);
                            }
                        });

                        await fs.promises.writeFile(this.path, JSON.stringify(productsAux, null, "\t"));
                        return 1;
                    }
                    else {
                        throw new Error("product-missing");
                    }
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
            if(Error(error).message.includes("file-empty")) {
                return -2;
            }
            if(Error(error).message.includes("product-missing")) {
                return -3;
            }
            return 0;
        }
    }

    async getProductById(id) {
        try {
            if(this.fileExists()) {
                await this.getProducts();
                
                if(this.fileIsEmpty(this.products)) {
                    throw new Error("file-empty");
                }

                const product = this.products.find(prod => prod.id === id);
                
                if(!product) {
                    throw new Error("product-missing");
                }

                return product;
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
            if(Error(error).message.includes("product-missing")) {
                return -3;
            }
            return 0;
        }
    }

    async getLatestId() {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    return 1;
                }
                else {
                    return this.products[this.products.length-1].id + 1;
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
