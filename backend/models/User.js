const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    cart: { type: Object, default: {} },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
