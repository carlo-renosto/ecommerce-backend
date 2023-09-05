// npm i express
import express from "express";
import { ProductManager } from "./ProductManager.js";

const port = 8080;
const app = express(); 
const productManager = new ProductManager("../products.json");

app.listen(port, () => console.log("Servidor en ejecucion (https//localhost:8080)"));

app.get("/products", async(request, response) => {
    const limit = parseInt(request.query.limit);
    const products = await productManager.getProducts();

    if(limit) {
        const productsAux = products.slice(0, limit);
        response.send(productsAux);
    }
    else {
        response.send(products);
    }
});

app.get("/products/:pid", async(request, response) => {
    const id = parseInt(request.params.pid);
    const product = await productManager.getProductById(id);

    if(product) {
        response.send(product);
    }
    else {
        response.send("ID inexistente");
    }
});

// http://localhost:8080/products 
// http://localhost:8080/products?limit=5 
// http://localhost:8080/products/2
// http://localhost:8080/products/34123123