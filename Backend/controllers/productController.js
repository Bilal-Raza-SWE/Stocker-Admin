const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const product = new Product({ name, description, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, stock },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
