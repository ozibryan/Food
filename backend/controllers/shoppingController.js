import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    console.log(cart);

    if (cart) {
      items.forEach((item) => {
        const existingItem = cart.items.find(
          (cartItem) => cartItem.recipeReference === item.id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });

      cart = await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      const newCart = new Cart({ userId, items });
      const savedCart = await newCart.save();
      return res.status(201).json({ success: true, cart: savedCart });
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.recipeReference"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err });
  }
};
