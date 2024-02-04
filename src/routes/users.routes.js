
import { Router } from "express";
import { usersController } from "../controller/users.controller.js";
import { authenticate } from "../utils/middlewares/auth.js";

import { uploadDocuments } from "../utils/multer.js";

const router = Router();

router.get("/current", authenticate("currentStrategy"), usersController.getUserCurrent);

router.post("/:uid/documents", uploadDocuments.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
]),  usersController.updateUserDocuments);

router.put("/premium/:uid", usersController.updateUserRole);

export { router as usersRouter }