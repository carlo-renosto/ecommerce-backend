
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
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const exists = await this.productExists(code);

        if (exists) {
            console.log("\nError: Code already exists");
            return;
        }

        const newId = await this.getLatestId();

        const newProduct = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        await this.addProductFile(newProduct);
        console.log(`\nProducto agregado (ID ${newProduct.id}, code ${newProduct.code})`);
    }

    async addProductFile(product) {
        try {
            if(this.fileExists()) {
                await this.getProducts();

                this.products.push(product);

                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
            }
            else {
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
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
                throw new Error("No es posible leer el archivo");
            }
        } 
        catch (error) {
            throw error;
        }
    }

    async updateProduct(id, product) {
        try {
            if(this.fileExists()) {
                this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    throw new Error("El archivo se encuentra vacio");
                }
                else {
                    var index = this.products.findIndex(prod => prod.id === id);
                    if(index == -1) {
                        console.log("\nError: ID " + id + " not found (updateProduct)");
                        return;
                    }
                    if(product.id && product.id != id) {
                        console.log("\nError: El ID no puede ser modificado (updateProduct)");
                    }

                    this.products[index] = {...this.products[index], ...product}
     
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                    console.log("\nProducto actualizado (ID " + id + ")");
                }
            }
            else {
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            if(this.fileExists()) {
                this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    throw new Error("El archivo se encuentra vacio");
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
                        console.log("\nProducto eliminado (ID " + id + ", code " + product.code + ")");
                    }
                    else {
                        console.log("\nError: ID " + id + " not found (deleteProduct)");
                    }
                }
            }
            else {
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            if(this.fileExists()) {
                this.getProducts();
                
                if(this.fileIsEmpty(this.products)) {
                    throw new Error("El archivo se encuentra vacio");
                }
                const product = this.products.find(prod => prod.id === id);
                
                if(!product) {
                    console.log("\nError: ID " + id + " not found (getProductById)");
                }

                return product;
            }
            else {
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
        }
    }

    async getLatestId() {
        try {
            if(this.fileExists()) {
                this.getProducts();

                if(this.fileIsEmpty(this.products)) {
                    return 1;
                }
                else {
                    return this.products[this.products.length-1].id + 1;
                }
            }
            else {
                throw new Error("No es posible leer el archivo");
            }
        }
        catch(error) {
            throw error;
        }
    }
}
