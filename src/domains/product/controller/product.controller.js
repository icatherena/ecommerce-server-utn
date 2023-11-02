const {Router} = require('express');
const Product = require('../model/product.model');

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length > 0) {
            return res.status(200).json(products);
        }
    } catch (error) {
        throw Error('Have not found any products. Try again later!');
    }
});

productRouter.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId);
        const product = await Product.findById(productId);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

productRouter.post('/', async (req, res) => {
    try {
        const data = req.body;
        console.log('product req: ', data);
        const product = await Product.create(data);
        console.log('product created: ', product);
        return res.status(200).json(product);
    } catch (error) {
        throw Error('Could not create new product');
    }
});

productRouter.put('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (product) {
            const data = req.body;
            console.log(data);
            const productUpdated = await Product.findByIdAndUpdate(productId, data, {new: true});  // New set to true returns updated document
            return res.status(200).json(productUpdated);
        } else {
            throw Error('Could not found product');
        }
    } catch {
        throw Error('Could not update product');
    }
});

productRouter.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (product) {
            const toBeDeleted = await Product.findByIdAndDelete(productId);
            return res.status(200).json(`Product ${productId} successfully deleted`);
        } else {
            throw new Error('Could not find product'); 
        }
    } catch {
        console.error(error);
        res.status(500).json({ message: 'Could not delete product' });
    }
});

module.exports = { productRouter };