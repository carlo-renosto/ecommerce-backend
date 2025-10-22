
// Correr con:
// npx mocha test/productsDao.test.js

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { expect } from 'chai';
import { productManagerMongo } from "../src/dao/managers/mongo/product.mongo.js";

let mongoServer;
let productManager;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  productManager = new productManagerMongo();
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Products DAO - Pruebas', () => {
    const productManager = new productManagerMongo();
    var pid = 0;
    var product = undefined;

    it('Crear un nuevo producto', async () => {
        const productInfo = {
            title: 'Test Product',
            description: 'This is a test product',
            code: 'ABC123',
            price: 20,
            stock: 10,
            category: 'Technology',
            owner: 'admin',
            thumbnail: 'test-thumbnail-url',
        };

        const createdProduct = await productManager.createProduct(productInfo);
        pid = createdProduct._id;
        product = createdProduct;
        expect(createdProduct).to.have.property('_id');
    });

    it('Obtener array de productos existentes', async () => {
        const products = await productManager.getProducts();
        expect(products).to.be.an('array');
    });

    it('Obtener un producto existente', async () => {
        const product = await productManager.getProductById(pid);
        expect(product).to.be.an('object');
    });

    it('Actualizar un producto existente', async () => {
        product.price = 40;
        product.stock = 100;

        const updatedProduct = await productManager.updateProduct(pid, product)
        expect(updatedProduct).to.be.an('object');
    });
});