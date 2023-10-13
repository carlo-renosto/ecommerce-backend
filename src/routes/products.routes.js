
import { Router } from "express";
import { ProductManagerM } from "../dao/index.js";
import { socket_server } from "../app.js"

const router = Router();
 
router.get("/", async(request, response) => {
    try {
        const limit = request.query.limit == undefined ? 10 : parseInt(request.query.limit);
        const page = request.query.page == undefined ? 1 : parseInt(request.query.page);
        const query = request.query.query == undefined ? "" : request.query.query;
        const sort = request.query.sort == undefined ? 0 : parseInt(request.query.sort);

        var products = await ProductManagerM.getProducts(limit, page, query, sort);
                
        response.json({status: "success", data: products});
    }
    catch(error) {
        response.json({status: "error", message: "Productos no obtenidos (error)"});
    }
});

router.get("/:pid", async(request, response) => {
    try {
        const id = request.params.pid;

        const product = await ProductManagerM.getProductById(id);
        response.json({status: "success", data: product});
    }
    catch(error) {
        response.json({status: "error", message: "Producto no obtenido (error)"});
    }
});

router.post("/", async(request, response) => {
    try {
        const productInfo = request.body;
        const productCreated = await ProductManagerM.createProduct(productInfo)

        socket_server.emit("product-add", productCreated);

        response.json({status: "success", data: productCreated});
    }
    catch(error) {
        response.json({status: "error", message: "Producto no agregado (error)"});
    }
});

router.put("/:pid", async(request, response) => {
    try {
        const id = request.params.pid;
        const productInfo = request.body;

        const productUpdated = await ProductManagerM.updateProduct(id, productInfo);

        socket_server.emit("product-update", productUpdated);

        response.json({status: "success", data: productUpdated});
    }
    catch(error) {
        response.json({status: "error", message: "Producto no actualizado (error)"});
    }
});

router.delete("/:pid", async(request, response) => {
    try {
        const id = request.params.pid;

        await ProductManagerM.deleteProduct(id);

        socket_server.emit("product-delete", id);

        response.json({status: "success", pid: id});
    }
    catch(error) {
        response.json({status: "error", message: "Producto no eliminado (error)"});
    }
    
});

export { router as productsRouter };
