
import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { invalidParamErrorHandler, invalidBodyErrorHandler } from "../middlewares/error.js";

const router = Router();

router.get("/cart/cart", authenticate("jwt-auth"), cartsController.getCartView);

router.get("/cart/cartAdd", authorize(["admin"]));

router.get("/cart/cartDel", authorize(["admin"]));

router.get("/cart/cartSearch", authenticate("jwt-auth"), authorize(["admin"]), cartsController.getCartSearch);

router.get("/:cid", invalidParamErrorHandler, cartsController.getCart);

router.post("/", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.createCart);

router.put("/:cid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.updateCart);

router.post("/:cid/product/:pid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.addCartProduct);

router.post("/productAdd/:pid", authenticate("jwt-auth"), cartsController.addCartProductView);

router.delete("/:cid", invalidParamErrorHandler, cartsController.deleteCart);

router.delete("/:cid/products/:pid", invalidParamErrorHandler, cartsController.deleteCartProduct);

router.put("/:cid/purchase", invalidParamErrorHandler, cartsController.purchaseCart);

export { router as cartsRouter };
