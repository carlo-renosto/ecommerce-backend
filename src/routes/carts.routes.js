
import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";
import { invalidParamErrorHandler, invalidBodyErrorHandler } from "../middlewares/error.js";

const router = Router();

router.get("/:cid", invalidParamErrorHandler, cartsController.getCart);

router.post("/", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.createCart);

router.put("/:cid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.updateCart);

router.post("/:cid/product/:pid", invalidParamErrorHandler, invalidBodyErrorHandler, cartsController.addCartProduct);

router.delete("/:cid", invalidParamErrorHandler, cartsController.deleteCart);

router.delete("/:cid/products/:pid", invalidParamErrorHandler, cartsController.deleteCartProduct);

router.put("/:cid/purchase", invalidParamErrorHandler, cartsController.purchaseCart);

export { router as cartsRouter };
