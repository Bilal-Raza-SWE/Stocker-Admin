const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Import DB connection logic

dotenv.config();

// Your app setup (routes, middleware, etc.)
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Start the server
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
