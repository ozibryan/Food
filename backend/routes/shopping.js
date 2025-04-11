import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/shoppingController.js"; // Adjust path if needed

const router = express.Router();

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.post("/remove", removeFromCart);

router.delete("/:userId", clearCart);

export default router;
