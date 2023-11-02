const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = require('../../product/model/product.model');

const itemSchema = new Schema({
    product: 
        productSchema
    ,
    quantity: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        itemSchema
    ],
    total: {
        type: String,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;