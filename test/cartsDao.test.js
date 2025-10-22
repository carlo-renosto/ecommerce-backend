
// Correr con:
// npx mocha test/cartsDao.test.js

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { expect } from 'chai';
import { cartManagerMongo } from "../src/dao/managers/mongo/cart.mongo.js";

let mongoServer;
let cartManager;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  cartManager = new cartManagerMongo();
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Carts DAO - Pruebas', () => {
    const cartManager = new cartManagerMongo();
    var cid = 0;
    var cart = undefined;

    it('Crear un nuevo carrito', async () => {
        const uid = "65b0773bce14ee1278c2dc51"

        const createdCart = await cartManager.createCart(uid);
        cid = createdCart.id;
        cart = createdCart;
        expect(createdCart).to.have.property('_id');
    });

    it('Obtener un carrito existente', async () => {
        const cart = await cartManager.getCartById(cid, false);
        expect(cart).to.be.an('object');
    });

    it('Actualizar un carrito existente', async () => {
        const newCart = {
            _id: cart.id,
            _uid: "65b0773bce14ee1278c2dc51",
            products: [
                {
                    _id: "65b0773bce14ee1278c34d52",
                    title: "Producto",
                    description: "Descripción"
                }
            ]
        }

        const updatedCart = await cartManager.updateCart(newCart._id, newCart);
        expect(updatedCart).to.be.an('object');
    });
    
    it('Vaciar un carrito existente', async () => {
        var cart = await cartManager.getCartById(cid, false);
        cart.products = [];

        const cartCleared = await cartManager.deleteCart(cid, cart);
        expect(cartCleared).to.be.an('object');
    });
});