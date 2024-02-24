
import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";
import { authenticate, authorize } from "../utils/middlewares/auth.js";
import { invalidParamErrorHandler, invalidBodyErrorHandler } from "../utils/middlewares/error.js";

const router = Router();

router.get("/cart/cart", authenticate("jwt-auth"), cartsController.getCartView);

router.get("/cart/cartDel", authenticate("jwt-auth"), cartsController.clearCartView);

router.get("/cart/cartSearch", authenticate("jwt-auth"), authorize(["admin"], true, "carts"), cartsController.searchCartView);

router.get("/cart/cartSearchView", authenticate("jwt-auth"), authorize(["admin"]), cartsController.searchCartViewSubmit);

router.post("/productAdd/:pid", authenticate("jwt-auth"), cartsController.addCartProductView);

router.post("/:cid/productDel/:pid", cartsController.deleteCartProductView);

router.post("/:cid/purchaseView", authenticate("jwt-auth"), invalidParamErrorHandler, cartsController.purchaseCartView);

router.get("/:cid", invalidParamErrorHandler, cartsController.getCart);

router.post("/", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.createCart);

router.put("/:cid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.updateCart);

router.post("/:cid/product/:pid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.addCartProduct);

router.delete("/:cid", invalidParamErrorHandler, cartsController.deleteCart);

router.delete("/:cid/products/:pid", invalidParamErrorHandler, cartsController.deleteCartProduct);

router.put("/:cid/purchase", invalidParamErrorHandler, cartsController.purchaseCart);

export { router as cartsRouter };
