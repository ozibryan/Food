import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        // productId: { type: String, required: true },
        name: { type: String, required: true }, // Name of the product
        imageDescription: { type: String, required: true }, // URL or path to the product image
        recipeReference: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recipe", // Reference to the Recipe collection
          required: true,
        }, // Reference ID for the recipe
        quantity: { type: Number, required: true, default: 1 }, // Quantity of the product
      },
    ],
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
