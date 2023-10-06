
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

        const cart = await CartManagerM.updateCart(cid, pid);
        response.json({status: "success", data: cart});
    }
    catch(error) {
        response.json({status: "error", message: "Carrito no actualizado (error)"});
    }
});

export { router as cartsRouter };
