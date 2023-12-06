
import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";

const router = Router();

router.get("/:cid", cartsController.getCart);

router.post("/", cartsController.createCart);

router.put("/:cid", cartsController.updateCart);

router.post("/:cid/product/:pid", cartsController.addCartProduct);

router.delete("/:cid", cartsController.deleteCart);

router.delete("/:cid/products/:pid", cartsController.deleteCartProduct);

router.put("/:cid/purchase", cartsController.purchaseCart);

export { router as cartsRouter };
