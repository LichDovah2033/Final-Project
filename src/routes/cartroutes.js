import { Router } from "express";
import { authenticate } from "../middleware/authmiddleware.js";
import * as cartController from "../controllers/cartcontroller.js";

const router = Router();

router.get("/", authenticate, cartController.getCart);
router.post("/", authenticate, cartController.startCart);
router.put("/", authenticate, cartController.addItemToCart);
router.put("/remove", authenticate, cartController.removeItemFromCart);
router.delete("/purchase", authenticate, cartController.purchaseCart);

export default router;
