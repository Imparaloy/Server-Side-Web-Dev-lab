const db = require('../config/db.js');
const {v4: uuidv4} = require('uuid');

const Product = {
    getAll (callback) {
        db.query('SELECT * FROM products WHERE is_deleted = 0', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getById (id, callback) {
        db.query('SELECT * FROM products WHERE id = ? AND is_deleted = 0', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || {});
        });
    },
    search (keyword, callback) {
        const searchKeyword = `%${keyword}%`;
        db.query('SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0', [searchKeyword], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create (productData, callback) {
        const { name, price, discount, review_count, image_url } = productData;
        const query = 'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, price, discount, review_count, image_url], (err, result) => {
            if (err) return callback(err);
            callback(null, { id: result.insertId });
        });
    },
    update (id, productData, callback) {
        const { name, price, discount, review_count, image_url } = productData;
        const query = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ? AND is_deleted = 0';
        db.query(query, [name, price, discount, review_count, image_url, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result.affectedRows > 0);
        });
    },
    softDelete (id, callback) {
        db.query('UPDATE products SET is_deleted = 1 WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result.affectedRows > 0);
        });
    },
    restore (id, callback) {
        db.query('UPDATE products SET is_deleted = 0 WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result.affectedRows > 0);
        });
    }
};

module.exports = Product;
