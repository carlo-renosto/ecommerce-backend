
import { productsService } from "../repository/index.js";
import { userService } from "../repository/index.js";
import { sendPdDeleteEmail } from "../config/configGmail.js";
import { socket_server } from "../app.js";

export class productsController {
    static getProductsView = async(request, response) => {
        try {
            const products = await productsService.getProducts(10, 1);
            response.render("productsView", products);
        }
        catch(error) {
            response.render("products");
        }
    }

    static getProductsViewDropdown = async(request, response) => {
        try {
            let option = request.query.dropdown;
            let owner = request.user.id;

            let products = [];

            if(option == "0") {
                products = await productsService.getProducts(10, 1);
            }
            else {
                products = await productsService.getProductsOwner(owner);
            }
            
            response.render("productsView", products);
        }
        catch(error) {
            response.render("products");
        }
    }

    static createProductView = (request, response) => {
        try {
            response.render("productsAdd");
        }
        catch(error) {
            response.render("products");
        }
    }

    static createProductViewSubmit = async(request, response) => {
        try {
            const productInfo = request.body;
            productInfo.owner = request.user.id;

            const productCreated = await productsService.createProduct(productInfo);
    
            socket_server.socket.emit("product-add", productCreated);
    
            response.render("productsAdd", {message: "Producto añadido"});
        }
        catch(error) {
            response.render("productsAdd", {error: "Producto no añadido (error)"});
        }
    }

    static searchProductView = (request, response) => {
        try {
            response.render("productsSearch");
        }
        catch(error) {
            response.render("products");
        }
    }

    static searchProductViewSubmit = async(request, response) => {
        try {
            let pid = request.query.pid;

            const product = await productsService.getProductById(pid);

            if(product) {
                response.render("productsSearch", {product: product});
            }
            else {
                response.render("productsSearch", {error: "Producto no encontrado"});
            }            
        }
        catch(error) {
            response.render("productsSearch", {error: "Producto no encontrado"});
        }
    }

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
        }
    }

    static getProductById = async(request, response) => {
        try {
            const id = request.params.pid;
    
            const product = await productsService.getProductById(id);

            response.json({status: "success", data: product});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no obtenido (error)"});
        }
    }

    static createProduct = async(request, response) => {
        try {
            const productInfo = request.body;
            productInfo.owner = request.user.id;

            const productCreated = await productsService.createProduct(productInfo);
    
            socket_server.socket.emit("product-add", productCreated);
    
            response.json({status: "success", data: productCreated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no agregado (error)"});
        }
    }

    static updateProduct = async(request, response) => {
        try {
            const id = request.params.pid;
            const productInfo = request.body;
    
            const productUpdated = await productsService.updateProduct(id, productInfo);
    
            socket_server.socket.emit("product-update", productUpdated);
    
            response.json({status: "success", data: productUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Producto no actualizado (error)"});
        }
    }

    static deleteProduct = async(request, response) => {
        try {
            const id = request.body.pid || request.params.pid;
            
            if(request.user?.role == "premium") {
                await productsService.deleteProduct(id, request.user.id, true);
                await sendPdDeleteEmail(request, request.user.email);
            }
            else {
                const product = await productsService.getProductById(id);
                await productsService.deleteProduct(id);

                if(product.owner && product.owner != "admin") {
                    const user = await userService.getUserById(product.owner);
                    await sendPdDeleteEmail(request, user.email, product);
                }
            }
    
            socket_server.socket.emit("product-delete", id);
    
            response.json({status: "success", pid: id});
        }
        catch(error) {
            response.json({status: "error", message: error.message});
        }    
    }
}