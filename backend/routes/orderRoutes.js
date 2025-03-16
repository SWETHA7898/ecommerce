const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { fetchUser } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: "rzp_test_SmT3UOUcpyxz3T",
    key_secret: "vxbMnba1bZArbXRG9k46q6GO"
});

// 🔹 Place Order
router.post("/placeorder", fetchUser, async (req, res) => {
    try {
        const { items, amount, address, phone } = req.body;
        const finalAmount = amount * 100;

        // Create Razorpay Order
        const order = await razorpayInstance.orders.create({
            amount: finalAmount,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        });

        // Save Order in Database
        const newOrder = new Order({
            userId: req.user.id,
            items,
            amount,
            address,
            phone
        });

        await newOrder.save();

        // Clear User Cart
        await User.findByIdAndUpdate(req.user.id, { cart: {} });

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// 🔹 Verify Payment
router.post("/verify", async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const secret = "vxbMnba1bZArbXRG9k46q6GO";

    const expectedSign = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (expectedSign === razorpay_signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
});

module.exports = router;
