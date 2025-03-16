const express = require("express");
const { fetchUser } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// 🔹 Add to Cart
router.post("/add", fetchUser, async (req, res) => {
    const { itemId } = req.body;

    try {
        let user = await User.findById(req.user.id);
        user.cart[itemId] = (user.cart[itemId] || 0) + 1;
        await user.save();

        res.json({ success: true, cart: user.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// 🔹 Remove from Cart
router.post("/remove", fetchUser, async (req, res) => {
    const { itemId } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (user.cart[itemId] > 0) {
            user.cart[itemId] -= 1;
            await user.save();
        }

        res.json({ success: true, cart: user.cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// 🔹 Get Cart
router.post("/get", fetchUser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        res.json(user.cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
