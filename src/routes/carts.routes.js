
import { Router } from "express";
import { CartManager } from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json");

router.get("/:cid", async(request, response) => {
    const id = parseInt(request.params.cid);
    const result = await cartManager.getCartById(id);

    if(result.id != undefined) {
        response.send(result);
    }
    else {
        switch(result) {
            case -1: response.status(404).json({message: `Error: Archivo no existe (carts.json)`}); break;
            case -2: response.status(500).json({message: `Error: Archivo vacio (carts.json)`}); break;
            case -3: response.status(404).json({message: `Error: Carrito no existe (id ${id})`}); break;
            default: response.status(500).json({message: `Error inesperado`});
        }
    }
});

router.post("/", async(request, response) => {
    const result = await cartManager.addCart();

    switch(result) {
        case 1: response.json({message: `Carrito agregado`}); break;
        case -1: response.status(404).json({message: `Error: Archivo no existe (carts.json)`}); break;
        default: response.status(500).json({message: `Error inesperado`});
    }
});

router.post("/:cid/product/:pid", async(request, response) => {
    const cid = request.params.cid;
    const pid = request.params.pid;

    const result = await cartManager.addProductToCart(cid, pid);

    switch(result) {
        case 1: response.json({message: `Producto agregado (cart id ${cid}, product id ${pid})`}); break;
        case -1: response.status(404).json({message: `Error: Archivo no existe (products.json)`}); break;
        case -2: response.status(404).json({message: `Error: Carrito no existe (id ${cid}`}); break;
        case -3: response.status(404).json({message: `Error: Producto no existe (id ${pid})`}); break;
        default: response.status(500).json({message: `Error inesperado`});
    }
});

export { router as cartsRouter };
