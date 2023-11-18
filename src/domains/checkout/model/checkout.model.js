const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart', // Referencia al modelo 'Cart'
        required: true,
    },
    paymentInfo: {
        name: String,
        cardNumber: String,
        expireDate: String,
        CVV: String,
    },
});

module.exports = mongoose.model('Checkout', checkoutSchema);