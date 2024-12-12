const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const inventoryRoutes = require("./routes/inventoryRoutes");
// const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//connect to DB server
connectDB();

// Authentication Middleware (Protect all routes)
// app.use(authMiddleware);

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/inventory", inventoryRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`URL--> http://localhost:${PORT}`)
});
