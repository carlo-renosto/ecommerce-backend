
import { productsService } from "../repository/index.js";
import { customError } from "../repository/errors/customError.service.js";
import { eError } from "../enums/errors.enum.js";
import { socket_server } from "../app.js";

export class productsController {
    static getProducts = async(request, response) => {
        try {
            const limit = request.query.limit == undefined ? 10 : parseInt(request.query.limit);
            const page = request.query.page == undefined ? 1 : parseInt(request.query.page);
            const query = request.query.query == undefined ? "" : request.query.query;
            const sort = request.query.sort == undefined ? 0 : parseInt(request.query.sort);
    
            var products = await productsService.getProducts(limit, page, query, sort);
                    
            response.json({status: "success", data: products});
        }
        catch(error) {
            response.json({status: "error", message: "Productos no obtenidos (error)"});
            console.log("Error (product.controller.js): " + error.message);
        }
    };

    static getProductsView = async(request, response) => {
        try {
            const products = await productsService.getProducts(10, 1);

            const object = {
                products: products,
                email: request.user.email,
                role: request.user.role
            }

            response.render("products", {object});
        }
        catch(error) {
            response.render("products");
            console.log("Error (product.controller.js): " + error.message);
        }
    }

    static getProductById = async(request, response) => {
        try {
            const id = request.params.pid;

            if(Number.isNaN(parseInt(id))) {
                customError.createError({
                    name: "Get product error",
                    cause: "Se ha recibido un ID inválido. El ID tiene que ser alfanumérico. Ejemplo: 651f20d37ddebb31530de063",
                    message: "ID inválido",
                    errorCode: eError.INVALID_PARAM
                });
            }
    
            const product = await productsService.getProductById(id);
            response.json({status: "success", data: product});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no obtenido (error)"});
            console.log("Error (product.controller.js): " + error.message);
        }
    };

    static createProduct = async(request, response) => {
        try {
            const productInfo = request.body;
            const productCreated = await productsService.createProduct(productInfo)
    
            socket_server.socket.emit("product-add", productCreated);
    
            response.json({status: "success", data: productCreated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no agregado (error)"});
            console.log("Error (product.controller.js): " + error.message);
        }
    };

    static updateProduct = async(request, response) => {
        try {
            const id = request.params.pid;
            const productInfo = request.body;

            if(Number.isNaN(parseInt(id))) {
                customError.createError({
                    name: "Get product error",
                    cause: "Se ha recibido un ID inválido. El ID tiene que ser alfanumérico. Ejemplo: 651f20d37ddebb31530de063",
                    message: "ID inválido",
                    errorCode: eError.INVALID_PARAM
                });
            }
    
            const productUpdated = await productsService.updateProduct(id, productInfo);
    
            socket_server.socket.emit("product-update", productUpdated);
    
            response.json({status: "success", data: productUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no actualizado (error)"});
            console.log("Error (product.controller.js): " + error.message);
        }
    };

    static deleteProduct = async(request, response) => {
        try {
            const id = request.params.pid;

            if(Number.isNaN(parseInt(id))) {
                customError.createError({
                    name: "Get product error",
                    cause: "Se ha recibido un ID inválido. El ID tiene que ser alfanumérico. Ejemplo: 651f20d37ddebb31530de063",
                    message: "ID inválido",
                    errorCode: eError.INVALID_PARAM
                });
            }
    
            await productsService.deleteProduct(id);
    
            socket_server.socket.emit("product-delete", id);
    
            response.json({status: "success", pid: id});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no eliminado (error)"});
            console.log("Error (product.controller.js): " + error.message);
        }    
    };
}