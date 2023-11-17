
import { cartsService } from "../services/carts.service.js";

const service = new cartsService();

export class cartsController {
    static getCart = async(request, response) => {
        try {
            const id = request.params.cid;
    
            const cart = await service.getCartById(id);
            response.json({status: "success", data: cart});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    };

    static getCartView = async(request, response) => {
        try {
            const cid = request.query.cid || request.params.cid;
    
            const cart = await service.getCartById(cid);
            response.render("carts", cart);
        }
        catch(error) {
            response.render("carts");
        }
    }

    static createCart = async(request, response) => {
        try {
            const cart = await service.createCart();
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
    
            const cartUpdated = await service.updateCart(cid, cartProducts);
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
    
            const cartUpdated = await service.updateCartProduct(cid, pid);
            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static addCartProductQuantity = async(request, response) => {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
            const quantity = request.body.quantity;
    
            const cartUpdated = await service.updateCartProductQuantity(cid, pid, quantity);
            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static deleteCart = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const cartUpdated = await service.deleteCart(cid);
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
    
            const cartUpdated = await service.deleteCartProduct(cid, pid);
            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }
}