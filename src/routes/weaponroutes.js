import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/authmiddleware.js";
import * as weaponController from "../controllers/weaponcontroller.js";

const router = Router();

router.get("/", authenticate, weaponController.getAllWeapons);
router.get("/:id", authenticate, weaponController.getWeaponById);
router.post("/", authenticate, requireAdmin, weaponController.createWeapon);
router.delete("/", authenticate, requireAdmin, weaponController.deleteAllWeapons);
router.delete("/:id", authenticate, requireAdmin, weaponController.deleteWeapon);

export default router;
