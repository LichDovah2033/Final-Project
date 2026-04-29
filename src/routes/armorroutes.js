import { Router } from "express";
import { authenticate, requireAdmin } from "../middleware/authmiddleware.js";
import * as armorController from "../controllers/armorcontroller.js";

const router = Router();

router.get("/", authenticate, armorController.getAllArmors);
router.get("/:id", authenticate, armorController.getArmorById);
router.post("/", authenticate, requireAdmin, armorController.createArmor);
router.delete("/", authenticate, requireAdmin, armorController.deleteAllArmors);
router.delete("/:id", authenticate, requireAdmin, armorController.deleteArmor);

export default router;
