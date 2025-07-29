const PORT = 3000;
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.get('/', (req, res) => {
    res.send('Hello World!\nThis is the E-commerce API.');
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while retrieving products.', error: err });
        } else {
            const formatted = result.map(row => ({
                id: row.id,
                name: row.name,
                price: parseFloat(row.price),
                discount: parseFloat(row.discount),
                review_count: row.review_count,
                image_url: row.image_url
            }));
            res.status(200).json(formatted);
        }
    });
});

app.post('/products', express.json(), (req, res) => {
    const { name, price, discount, review_count, image_url } = req.body;
    connection.query(
        'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)',
        [name, price, discount, review_count, image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, message: 'Product created' }); 
        }
    );
});


app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while retrieving product.', error: err });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Product not found.' });
            } else {
                res.status(200).json({ message: 'Product retrieved successfully.', data: result });
            }
        }
    });
});

app.get('/products/search/:keyword', (req, res) => {
    const keyword = `%${req.params.keyword}%`;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    db.query(sql, [keyword], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error occurred while retrieving product.', error: err });
        } else {
            const formatted = result.map(row => ({
                id: row.id,
                name: row.name,
                price: parseFloat(row.price),
                discount: parseFloat(row.discount),
                review_count: row.review_count,
                image_url: row.image_url
            }));
            res.status(200).json(formatted);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});