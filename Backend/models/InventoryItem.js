// models/InventoryItem.js
const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Furniture", "Clothing", "Toys", "Books"],
  },
  supplier:{
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);
