
import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";
import { cartManagerDao } from "../dao/index.js";

const router = Router();

router.get("/:cid", cartsController.getCart);

router.post("/", cartsController.createCart);

router.put("/:cid", cartsController.updateCart);

router.post("/:cid/product/:pid", cartsController.addCartProduct);

router.put("/:cid/products/:pid", cartsController.addCartProductQuantity);

router.delete("/:cid", cartsController.deleteCart);

router.delete("/:cid/products/:pid", cartsController.deleteCartProduct);

export { router as cartsRouter };
