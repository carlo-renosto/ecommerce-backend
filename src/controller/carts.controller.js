
import { cartsService } from "../repository/index.js";
import { productsService } from "../repository/index.js";

export class cartsController {
    static createCart = async(request, response) => {
        try {
            const uid = request.body.uid;

            const cart = await cartsService.createCart(uid);
            
            response.json({status: "success", data: cart});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no agregado (error)"});
        }
    }

    static getCart = async(request, response) => {
        try {
            const id = request.params.cid;
    
            const cart = await cartsService.getCartById(id);

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

            response.render("cartsView", cart);
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    }

    static getCartClear = async(request, response) => {
        try {
            const uid = request.user.id;
    
            const cart = await cartsService.getCartByUid(uid);
            const cartUpdated = await cartsService.deleteCart(cart._id);

            response.render("cartsView", cartUpdated);
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    }

    static getCartSearch = (request, response) => {
        try {
            response.render("cartsSearch");
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
        }
    }

    static getCartSearchView = async(request, response) => {
        try {
            const cid = request.query.cid || request.params.cid;
    
            const cart = await cartsService.getCartById(cid);

            response.render("cartsSearch", cart);
        }
        catch(error) {
            response.render("cartsSearch", {error: "Carrito inexistente"});
        }
    }

    static updateCart = async(request, response) => {
        try {
            const cid = request.params.cid;
            const cartProducts = request.body;
    
            const cartUpdated = await cartsService.updateCart(cid, cartProducts);

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
            if(request.user.id == product.owner) {
                response.render("cartsView", {error: "Producto no añadido. Este producto fue publicado por usted."});
            }
                
            await cartsService.updateCartProduct(cid, pid, 1);
            const cartUpdated = await cartsService.getCartById(cid);

            response.render("cartsView", cartUpdated);
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static deleteCart = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const cartUpdated = await cartsService.deleteCart(cid);

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

            response.json({status: "success", data: cartUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static deleteCartProductView = async(request, response) => {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
            const admin = request.body.admin;

            await cartsService.deleteCartProduct(cid, pid);
            const cartUpdated = await cartsService.getCartById(cid);

            if(!admin) {
                response.render("cartsView", cartUpdated);
            }
            else {
                response.render("cartsSearch", cartUpdated);
            }
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no actualizado (error)"});
        }
    }

    static purchaseCart = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const ticket = await cartsService.purchaseCart(cid);

            response.json({status: "success", ticket: ticket});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no comprado (error)"});
        }
    }

    static purchaseCartView = async(request, response) => {
        try {
            const cid = request.params.cid;
    
            const ticket = await cartsService.purchaseCart(cid);

            response.render("ticket", {ticket: ticket});
        }
        catch(error) {
            response.json({status: "error", message: "Carrito no comprado (error)"});
        }
    }
}