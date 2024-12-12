const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;
