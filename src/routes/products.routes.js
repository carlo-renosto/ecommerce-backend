
import { Router } from "express";
import { productsController } from "../controller/products.controller.js";
import { authorize } from "../middlewares/auth.js";

const router = Router();
 
router.get("/", productsController.getProducts);

router.get("/:pid", productsController.getProductById);

router.post("/", authorize("admin"), productsController.createProduct);

router.put("/:pid", authorize("admin"), productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);

export { router as productsRouter };
