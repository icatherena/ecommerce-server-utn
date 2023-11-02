const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    info: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        enum: ['wardrobe', 'beds', 'mattresses', 'dressers', 'drawers'],
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;