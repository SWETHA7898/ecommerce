const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "Order is getting packed" },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
