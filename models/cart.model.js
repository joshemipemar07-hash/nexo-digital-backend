const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    imageUrl: { type: String }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    items: [cartItemSchema]
}, {
    versionKey: false
});

module.exports = mongoose.model('Cart', cartSchema, 'carts');