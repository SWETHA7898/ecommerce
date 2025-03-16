const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get All Products
router.get("/", async (req, res) => {
    let products = await Product.find({});
    res.json(products);
});

// Add a New Product
router.post("/add", async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({ id, ...req.body });
        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Delete Product
router.delete("/remove/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({ success: 1, deletedProduct: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
