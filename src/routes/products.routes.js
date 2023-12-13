
import { Router } from "express";
import { productsController } from "../controller/products.controller.js";
import { authorize } from "../middlewares/auth.js";
import { invalidParamErrorHandler } from "../middlewares/error.js";

const router = Router();
 
router.get("/", productsController.getProducts);

router.get("/:pid", invalidParamErrorHandler, productsController.getProductById);

router.post("/", authorize("admin"), productsController.createProduct);

router.put("/:pid", authorize("admin"), invalidParamErrorHandler, productsController.updateProduct);

router.delete("/:pid", authorize("admin"), invalidParamErrorHandler, productsController.deleteProduct);

export { router as productsRouter };
