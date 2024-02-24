
import { Router } from "express";
import { usersController } from "../controller/users.controller.js";
import { authenticate, authorize } from "../utils/middlewares/auth.js";

import { uploadDocuments } from "../utils/multer.js";

const router = Router();

router.get("/usersMenuView", authenticate("jwt-auth"), authorize("admin", true, "users"), usersController.getUsersMenuView);

router.get("/usersListView", authenticate("jwt-auth"), authorize("admin", true, "users"), usersController.getUsersListView);

router.get("/usersDeleteManyView", authenticate("jwt-auth"), authorize("admin", true, "users"), usersController.deleteUsersManyView);

router.post("/usersUpdateView", authenticate("jwt-auth"), authorize("admin", true, "users"), usersController.updateUsersView);

router.post("/usersDeleteOneView", authenticate("jwt-auth"), authorize("admin", true, "users"), usersController.deleteUsersOneView);

router.get("/currentView", authenticate("currentStrategy"), usersController.getUserCurrentView);

router.get("/", usersController.getUsers);

router.post("/:uid/documents", uploadDocuments.fields([
    { name: "identificacion", maxCount: 1 },
    { name: "domicilio", maxCount: 1 },
    { name: "estadoDeCuenta", maxCount: 1 },
]),  usersController.updateUserDocuments);

router.put("/premium/:uid", usersController.updateUserRole);

router.delete("/", usersController.deleteUsersMany);

export { router as usersRouter }