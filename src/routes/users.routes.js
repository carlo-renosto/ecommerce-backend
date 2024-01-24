
import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

import { uploadDocuments } from "../utils.js";

import { usersController } from "../controller/users.controller.js";

const router = Router();

router.get("/current", authenticate("currentStrategy"), usersController.getUserCurrent);

router.post("/:uid/documents", uploadDocuments.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
]),  usersController.updateUserDocuments);

router.put("/premium/:uid", usersController.updateUserRole);

export { router as usersRouter }