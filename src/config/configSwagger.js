import swaggerJsDoc from "swagger-jsdoc";
import path from "path";
import __dirname from "../utils.js";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API de app ecommerce",
            version: "1.0.0",
            description: "Definición de endpoints para la API de ecommerce"
        },
    },
    apis: [`${path.join(__dirname, "./docs/**/*.yaml")}`]
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);