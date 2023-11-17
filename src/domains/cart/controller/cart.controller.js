const { Router } = require("express");
const Cart = require('../model/cart.model');
const Product = require('../../product/model/product.model');
const User = require('../../user/model/user.model');

const cartRouter = Router();

// Obtener carrito
cartRouter.get('/:cartId', async (req, res) => {
    try {
        const userId = res.locals.context.userId;
        const cartId = req.params.cartId;

        const cart = await Cart.findOne({_id: cartId, user: userId})/* .populate({path: 'items.product', model: Product }) */;
        
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found or unauthorized'})
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong, could not fetch cart' });
    }
});

// Añadir un producto al carrito
cartRouter.post('/add/:productId', async (req, res) => {
    try {
        const userId = res.locals.context.userId; // Usuario registrado. 
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        
        let cart = await Cart.findOne({ user: userId }); // Busca si ya existe un carrito
        
        if (!cart) {
            cart = new Cart({ user: userId, items: [], total: 0, deliveryFee: 0, discount: 0}); // Si el carrito no existe, lo crea
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
            cart.items[productIndex].subtotal = product.price * cart.items[productIndex].quantity; // Recalcula el subtotal del item
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

        // Calcular el total del carrito
        cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

        await cart.save(); // Actualiza el carrito

        res.json({ message: 'Product added to cart', cart});        
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
}); 

// Actualizar la cantidad de items del carrito
cartRouter.put('/update/:cartId', async (req, res) => {
    const { action, quantity } = req.body;
    const cartId = req.params.cartId;
    const productId = req.body.productId;
    const userId = res.locals.context.userId;
    try {
        console.log(cartId)
        const cart = await Cart.findById(cartId).populate('items.product');
        console.log(cart)
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }

        if (cart.user._id.toString() !== userId) {
            res.status(403).json({ message: 'Forbidden: You are not authorized to modify this cart'});
        }
        
        // Encuentra el índice del producto en el carrito
        const productIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
    
        // Verifica si el producto existe en el carrito
        if (productIndex === -1 || !cart.items[productIndex]) {
          console.error(`Producto no encontrado en el carrito. ID del producto: ${productId}`);
          console.error('Contenido del carrito:', cart);
          return res.status(404).json({ error: 'Unable to find this product in current cart' });
        }
    
        const price = cart.items[productIndex].price;
        let itemQuantity = cart.items[productIndex].quantity;
        let itemSubtotal = cart.items[productIndex].subtotal;
    
        // Calcular el total antes de la modificación
        /* const totalAntes = cart.total; */
    
        const calculateNewSubtotal = () => {
            if (typeof itemQuantity !== 'number' || typeof price !== 'number') {
              console.error('Invalid itemQuantity or price:', itemQuantity, price);
              return 0;
            }
            return itemQuantity * price;
        };

        switch (action) {
          case 'increase':
            // Aumenta la cantidad
            itemQuantity += 1;
            itemSubtotal = calculateNewSubtotal();
            break;
    
          case 'decrease':
            // Disminuye la cantidad
            if (itemQuantity > 1) {
              itemQuantity -= 1;
              itemSubtotal = calculateNewSubtotal();
            } else {
              // Si la cantidad es 1, elimina el elemento del carrito
              // Puedes decidir si eliminar el producto completamente o solo reducir la cantidad a 0
              
              itemQuantity = 0;
              itemSubtotal = 0;
            }
            break;
    
          case 'empty-item':
     
            //simplemente reduciré la cantidad a 0
            itemQuantity = 0;
            itemSubtotal = 0;
            break;
    
          default:
            console.error('Invalid action');
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Actualiza los valores en el carrito
        cart.items[productIndex].quantity = itemQuantity;
        cart.items[productIndex].subtotal = itemSubtotal;
    
        // Calcula el nuevo total
        const totalDespues = cart.items.reduce((total, item) => total + item.subtotal, 0);
    
        // Actualiza el total del carrito
        cart.total = totalDespues;
    
        // Guarda el carrito actualizado en la base de datos
        await cart.save();
        return res.status(200).json({ message: 'Cart succesfully modified:', cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Request could not be processed'});
    }
});


// Eliminar carrito
cartRouter.delete('/remove/:cartId', async (req, res) => {
    try {
        const userId = res.locals.context.userId;
        console.log(userId)
        const cartId = req.params.cartId;

        const cart = await Cart.findById(cartId);
        console.log(cart)

        if (!cart || cart.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this cart'});
        }

        await Cart.findByIdAndDelete(cartId);
        return res.status(200).json({ message: `Cart ${cartId} successfully deleted`});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong. Unable to retrieve products from cart'});
    }
});

module.exports = {
    cartRouter
};