const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    newprice: { type: Number, required: true },
    oldprice: { type: Number, required: true },
    available: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);
