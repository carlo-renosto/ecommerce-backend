
import { Router } from "express";
import { CartManagerM } from "../dao/index.js";

const router = Router();

router.get("/:cid", async(request, response) => {
    try {
        const id = request.params.cid;

        const cart = await CartManagerM.getCartById(id);
        response.json({status: "success", data: cart});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no obtenido (error)"});
    }

});

router.post("/", async(request, response) => {
    try {
        const cart = await CartManagerM.createCart();
        response.json({status: "success", data: cart});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no agregado (error)"});
    }
});

router.post("/:cid/product/:pid", async(request, response) => {
    try {
        const cid = request.params.cid;
        const pid = request.params.pid;

        const cartUpdated = await CartManagerM.updateCartProduct(cid, pid);
        response.json({status: "success", data: cartUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});

router.put("/:cid", async(request, response) => {
    try {
        const cid = request.params.cid;
        const cartProducts = request.body;

        const cartUpdated = await CartManagerM.updateCart(cid, cartProducts);
        response.json({status: "success", data: cartUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});


router.put("/:cid/products/:pid", async(request, response) => {
    try {
        const cid = request.params.cid;
        const pid = request.params.pid;
        const quantity = request.body.quantity;

        const cartUpdated = await CartManagerM.updateCartProductQuantity(cid, pid, quantity);
        response.json({status: "success", data: cartUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});

router.delete("/:cid", async(request, response) => {
    try {
        const cid = request.params.cid;

        const cartUpdated = await CartManagerM.deleteCart(cid);
        response.json({status: "success", data: cartUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});

router.delete("/:cid/products/:pid", async(request, response) => {
    try {
        const cid = request.params.cid;
        const pid = request.params.pid;

        const cartUpdated = await CartManagerM.deleteCartProduct(cid, pid);
        response.json({status: "success", data: cartUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});

export { router as cartsRouter };
