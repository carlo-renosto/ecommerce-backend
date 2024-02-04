
import { Router } from "express";
import { productsController } from "../controller/products.controller.js";
import { authenticate, authorize } from "../utils/middlewares/auth.js";
import { invalidParamErrorHandler } from "../utils/middlewares/error.js";

const router = Router();
 
router.get("/", productsController.getProducts);

router.get("/productsView", authenticate("jwt-auth"), productsController.getProductsView);

router.get("/productsViewDropdown", authenticate("jwt-auth"), productsController.getProductsViewDropdown);

router.get("/productsAdd", authenticate("jwt-auth"), authorize(["premium", "admin"], true, "products"), productsController.getProductsCreate);

router.get("/productsSearch", authenticate("jwt-auth"), authorize(["premium", "admin"], true, "products"), productsController.getProductsSearch);

router.get("/productsSearchView", authenticate("jwt-auth"), productsController.getProductsSearchView);

router.get("/:pid", invalidParamErrorHandler, productsController.getProductById);

router.post("/", authenticate("jwt-auth"), authorize(["premium", "admin"]), productsController.createProduct);

router.post("/productsAdd", authenticate("jwt-auth"), authorize(["premium", "admin"]), productsController.createProductView);

router.put("/:pid", authenticate("jwt-auth"), authorize(["admin"]), invalidParamErrorHandler, productsController.updateProduct);

router.delete("/:pid", authenticate("jwt-auth"), authorize(["premium", "admin"]), invalidParamErrorHandler, productsController.deleteProduct);

router.post("/:pid", authenticate("jwt-auth"), authorize(["premium", "admin"]), invalidParamErrorHandler, productsController.deleteProduct)

export { router as productsRouter };
