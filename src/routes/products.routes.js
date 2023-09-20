
import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";
import { socket_server } from "../app.js"

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async(request, response) => {
    const limit = parseInt(request.query.limit);
    const result = await productManager.getProducts();

    if(result == -1) {
        response.status(404).json({message: `Error: Archivo no existe (products.json)`});
    }
    else if(result == 0) {
        response.status(500).json({message: `Error inesperado`});
    }
    else {
        const products = limit ? result.slice(0, limit) : result;
        response.send(products);
    }
});

router.get("/:pid", async(request, response) => {
    const id = parseInt(request.params.pid);
    const result = await productManager.getProductById(id);

    if(result.id != undefined) {
        response.send(result);
    }
    else {
        switch(result) {
            case -1: response.status(404).json({message: `Error: Archivo no existe (products.json)`}); break;
            case -2: response.status(500).json({message: `Error: Archivo vacio (products.json)`}); break;
            case -3: response.status(404).json({message: `Error: Producto no existe (id ${id})`}); break;
            default: response.status(500).json({message: `Error inesperado`});
        }
    }
});

router.post("/", async(request, response) => {
    const product = request.body;
    const result = await productManager.addProduct(product);

    switch(result) {
        case 1: response.json({message: `Producto agregado (code ${product.code})`}); break;
        case -1: response.status(404).json({message: `Error: Archivo no existe (products.json)`}); break;
        case -2: response.status(500).json({message: `Error: Campos faltantes`}); break;
        case -3: response.status(500).json({message: `Error: Producto ya existe (code ${product.code})`}); break;
        default: response.status(500).json({message: `Error inesperado`});
    }

    if(result == 1) {
        const products = await productManager.getProducts();
        socket_server.emit("update", products);
    }
});

router.put("/:pid", async(request, response) => {
    const id = parseInt(request.params.pid);
    const product = request.body;
    const result = await productManager.updateProduct(id, product);

    switch(result) {
        case 1: response.json({message: `Producto actualizado (id ${id})`}); break;
        case -1: response.status(404).json({message: `Error: Archivo no existe (products.json)`}); break;
        case -2: response.status(500).json({message: `Error: Archivo vacio (products.json)`}); break;
        case -3: response.status(404).json({message: `Error: Producto no existe (id ${id})`}); break;
        case -4: response.status(404).json({message: `Error: Campo no modificable (id)`}); break;
        default: response.status(500).json({message: `Error inesperado`});
    }

    if(result == 1) {
        const products = await productManager.getProducts();
        socket_server.emit("update", products);
    }
});

router.delete("/:pid", async(request, response) => {
    const id = parseInt(request.params.pid);
    const result = await productManager.deleteProduct(id);

    switch(result) {
        case 1: response.json({message: `Producto eliminado (id ${id})`}); break;
        case -1: response.status(404).json({message: `Error: Archivo no existe (products.json)`}); break;
        case -2: response.status(500).json({message: `Error: Archivo vacio (products.json)`}); break;
        case -3: response.status(404).json({message: `Error: Producto no existe (id ${id})`}); break;
        default: response.status(500).json({message: `Error inesperado`});
    }

    if(result == 1) {
        const products = await productManager.getProducts();
        socket_server.emit("update", products);
    }
});

export { router as productsRouter };
