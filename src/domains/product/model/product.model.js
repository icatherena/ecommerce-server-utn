const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nombre del producto'],
    },
    price: {
        type: Number,
        required: [true, 'Precio del producto'],
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    description: {
        type: String,
        default: false,
    },
    image: {
        type: String,
        default: false,
    },
    category: {
        type: String,
        enum: ['wardrobe', 'beds', 'mattresses', 'dressers', 'drawers', 'chairs', 'armchairs', ],
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;