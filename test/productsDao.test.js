
import { expect } from 'chai';
import mongoose from "mongoose";
import { productManagerMongo } from "../src/dao/managers/mongo/product.mongo.js" 

try {
    await mongoose.connect("mongodb+srv://ecmrc:BL99hsn2ZtvV8I9b@ecommerce.rowzcke.mongodb.net/?retryWrites=true&w=majority");
} 
catch(error) {
    console.log(error.message);
}

describe('Products DAO - Pruebas', () => {
    const productManager = new productManagerMongo();

    it('El DAO de productos permite crear un nuevo producto', async () => {
        const productInfo = {
            title: 'Test Product',
            description: 'This is a test product',
            code: 'abc160',
            price: 19.20,
            stock: 10,
            category: 'Tecnologia',
            owner: 'admin',
            thumbnail: 'test-thumbnail-url',
        };

        const createdProduct = await productManager.createProduct(productInfo);
        expect(createdProduct).to.have.property('_id');
    });

    it('El DAO de productos permite obtener un arreglo con todos los productos', async () => {
        const products = await productManager.getProducts();
        expect(products).to.be.an('array');
    });

    it('El DAO de productos permite obtener un producto existente', async () => {
        const pid = '652743059d6678e8ba28ce0d';

        const product = await productManager.getProductById(pid);
        expect(product).to.be.an('object');
    });
});