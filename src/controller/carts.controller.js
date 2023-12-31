
import { cartsService } from "../repository/index.js";
import { productsService } from "../repository/index.js";

export class cartsController {
    static getCart = async(request, response) => {
        try {
            const id = request.params.cid;
    
            const cart = await cartsService.getCartById(id);
            if(cart == -1) throw new Error();

            response.json({status: "success", data: cart});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    };

    static getCartView = async(request, response) => {
        try {
            const uid = request.user.id;
    
            const cart = await cartsService.getCartByUid(uid);
            if(cart == -1) throw new Error();

            response.render("cartsView", cart);
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    }

    static getCartSearch = async(request, response) => {
        try {
            const cid = request.query.cid || request.params.cid;
    
            const cart = await cartsService.getCartById(cid);
            if(cart == -1) throw new Error();

            response.render("carts", cart);
        }
        catch(error) {
            response.render("carts");
        }
    }

    static createCart = async(request, response) => {
        try {
            const uid = request.body.uid;

            const cart = await cartsService.createCart(uid);
            if(cart == -1) throw new Error();
            
            response.json({status: "success", data: cart});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no agregado (error)"});
        }
    }

    static updateCart = async(request, response) => {
        try {
            const cid = request.params.cid;
            const cartProducts = request.body;
    
            const cartUpdated = await cartsService.updateCart(cid, cartProducts);
            if(cartUpdated == -1) throw new Error();

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static addCartProduct = async(request, response) => {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
            var quantity = request.body.quantity;

            quantity = quantity == null ? 1 : parseInt(quantity);
                
            const cartUpdated = await cartsService.updateCartProduct(cid, pid, quantity);
            if(cartUpdated == -1) throw new Error();

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static addCartProductView = async(request, response) => {
        try {
            const cid = await cartsService.getCartByUid(request.user.id);
            const pid = request.params.pid;

            const product = await productsService.getProductById(pid);
            if(request.user.id == product.owner) throw new Error("");
                
            const cartUpdated = await cartsService.updateCartProduct(cid, pid, 1);
            if(cartUpdated == -1) throw new Error();

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static deleteCart = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const cartUpdated = await cartsService.deleteCart(cid);
            if(cartUpdated == -1) throw new Error();

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static deleteCartProduct = async(request, response) => {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
    
            const cartUpdated = await cartsService.deleteCartProduct(cid, pid);
            if(cartUpdated == -1) throw new Error();

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static purchaseCart = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const ticket = await cartsService.purchaseCart(cid);
            if(ticket == -1) throw new Error();

            response.json({status: "success", ticket: ticket});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no comprado (error)"});
        }
    }
}