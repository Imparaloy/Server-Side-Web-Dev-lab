const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

// Get all products

router.get('/products', productController.getAllProducts);

// Get product by ID

router.get('/products/:id', productController.getProductById);

// Search product by keyword

router.get('/products/search/:keyword', productController.searchProduct);

// Create product

router.post('/products', productController.createProduct);

// Update product

router.put('/products/:id', productController.updateProduct);

// Soft delete product

router.delete('/products/:id', productController.softDeleteProduct);

// Restore product

router.put('/products/restore/:id', productController.restoreProduct);

module.exports = router;