const express = require("express");
const admin = require("firebase-admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { firebaseToken, username } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

        let existingUser = await User.findOne({ email: decodedToken.email });
        if (existingUser) return res.status(400).json({ success: false, error: "Email already exists." });

        const user = new User({ name: username, email: decodedToken.email });
        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error during signup." });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { firebaseToken } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        let user = await User.findOne({ email: decodedToken.email });

        if (!user) return res.status(401).json({ success: false, error: "User not found." });

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, error: "Invalid Token" });
    }
});

module.exports = router;
