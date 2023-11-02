const { Router } = require("express");
const Cart = require('../model/cart.model');
const Product = require('../../product/model/product.model');
const User = require('../../user/model/user.model');

const cartRouter = Router();

// Añadir un producto al carrito
cartRouter.post('/add', async (req, res) => {
    try {
        const userId = res.locals.context; // Usuario registrado. 
        const { productId, quantity } = req.body;
        
        let cart = await Cart.findOne({ user: userId }); // Busca si ya existe un carrito
        
        if (!cart) {
            cart = new Cart({ id: userId, items: []}); // Si el carrito no existe, lo crea
        }

        const product = await Product.findById(productId); // Busca el producto por su id

        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Si no existe, retorna un mensaje de error
        }

        if (product.stockQuantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock for this product' }); // Devuelve un mensaje de error si el stock es menor que la cantidad añadida al carrito
        }

        const productIndex = cart.items.findIndex((item) => item.product == productId); // Busca entre todos los indices del array de items del carrito si hay alguno que coincida con el id del producto
        
        if (productIndex !== -1) {
            cart.items[productIndex].quantity += quantity; // Si existe en el carrito, actualiza la cantida del item
        } else {
            const subtotal = product.price * quantity;
            cart.items.push({
                product: productId,
                quantity: quantity,
                subtotal: subtotal
            })
        }

        product.stockQuantity -= quantity; // Actualiza el stock del producto
        await product.save();

        await cart.save(); // Actualiza el carrito

        res.json({ message: 'Product added to cart' });        
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
});

// Eliminar un producto del carrito
cartRouter.delete('/remove', async (req, res) => {

});

// Actualizar la cantidad de items del carrito
cartRouter.put('/update', async (req, res) => {

});

// Calcular el total del carrito
cartRouter.get('/total', async (req, res) => {

});

module.exports = {
    cartRouter
};