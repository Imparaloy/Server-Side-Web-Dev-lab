const express = require('express');
const app = express();
const PORT = 3000;
const productRoutes = require('./routes/productRoutes.js');

app.use(express.json());

app.use('/api', productRoutes);

app.listen(PORT, () => {

          console.log(`🚀 Server is running at http://localhost:${PORT}`);

});