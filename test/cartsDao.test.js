
import { expect } from 'chai';
import mongoose from "mongoose";
import { cartManagerMongo } from "../src/dao/managers/mongo/cart.mongo.js" 

try {
    await mongoose.connect("mongodb+srv://ecmrc:BL99hsn2ZtvV8I9b@ecommerce.rowzcke.mongodb.net/?retryWrites=true&w=majority");
} 
catch(error) {
    console.log(error.message);
}

describe('Carts DAO - Pruebas', () => {
    const cartManager = new cartManagerMongo();

    it('El DAO de carritos permite crear un nuevo carrito', async () => {
        const uid = "6584f6713252cb25a597267e"

        const createdCart = await cartManager.createCart(uid);
        expect(createdCart).to.have.property('_id');
    });

    it('El DAO de carritos permite obtener un carrito existente', async () => {
        const cid = '6567bfc1c5873616d95bd513';

        const cart = await cartManager.getCartById(cid, false);
        expect(cart).to.be.an('object');
    });

    
    it('El DAO de carritos permite vaciar un carrito', async () => {
        const cid = '6567bfc1c5873616d95bd513';

        var cart = await cartManager.getCartById(cid, false);
        cart.products = [];

        const cartCleared = await cartManager.deleteCart(cid, cart);
        expect(cartCleared).to.be.an('object');
    });
});