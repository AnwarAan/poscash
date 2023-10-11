import { Router } from "express";
import api from "../controllers/cart/api.js";
import jwtAuth from "../helpers/jwt-auth.js";

const router = Router();

router.get("/", api.getCarts);
router.get("/:cartId", api.getCartById);

router.post("/", api.addCart);

router.delete("/:cartId", jwtAuth, api.deleteCart);

export default router;
