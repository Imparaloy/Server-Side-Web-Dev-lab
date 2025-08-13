const Product = require('../models/productModel.js');

const productController = {
        getProductsView: (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).send('Database error');
        res.render('products', { products: results });
    });
    },
    getAllProducts: (req, res) => {
        Product.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },
    getProductById: (req, res) => {
        Product.getById(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(result);
        });
    },
    searchProduct: (req, res) => {
        Product.search(req.params.keyword, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },
    createProduct: (req, res) => {
        const { name, price, discount, review_count, image_url } = req.body;
        Product.create({ name, price, discount, review_count, image_url }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.id, message: 'Product created' });
        });
    },
    updateProduct: (req, res) => {
        const { name, price, discount, review_count, image_url } = req.body;
        Product.update(req.params.id, { name, price, discount, review_count, image_url }, (err, success) => {
            if (err) return res.status(500).json({ error: err.message });
            if (success) {
                res.json({ message: 'Product updated' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        });
    },
    softDeleteProduct: (req, res) => {
        Product.softDelete(req.params.id, (err, success) => {
            if (err) return res.status(500).json({ error: err.message });
            if (success) {
                res.json({ message: 'Product soft-deleted' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        });
    },
    restoreProduct: (req, res) => {
        Product.restore(req.params.id, (err, success) => {
            if (err) return res.status(500).json({ error: err.message });
            if (success) {
                res.json({ message: 'Product restored' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        });
    }
};

module.exports = productController;