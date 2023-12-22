
import { Router } from "express";
import { productsController } from "../controller/products.controller.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { invalidParamErrorHandler } from "../middlewares/error.js";

const router = Router();
 
router.get("/", productsController.getProducts);

router.get("/products", authenticate("jwt-auth"), productsController.getProductsView);

router.get("/productsAdd", authenticate("jwt-auth"), productsController.getProductsCreate);

router.get("/productsDel", authenticate("jwt-auth"), productsController.getProductsDelete);

router.get("/:pid", invalidParamErrorHandler, productsController.getProductById);

router.post("/", authenticate("jwt-auth"), authorize(["premium", "admin"]), productsController.createProduct);

router.put("/:pid", authenticate("jwt-auth"), authorize(["admin"]), invalidParamErrorHandler, productsController.updateProduct);

router.delete("/:pid", authenticate("jwt-auth"), authorize(["premium", "admin"]), invalidParamErrorHandler, productsController.deleteProduct);
router.post("/:pid", authenticate("jwt-auth"), authorize(["premium", "admin"]), invalidParamErrorHandler, productsController.deleteProduct)

export { router as productsRouter };
