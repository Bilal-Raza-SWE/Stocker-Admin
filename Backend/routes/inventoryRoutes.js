const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get all inventory items
router.get('/', inventoryController.getInventoryItems);

// Add a new inventory item
router.post('/', inventoryController.addInventoryItem);

// Edit an existing inventory item
router.put('/:id', inventoryController.editInventoryItem);

// Delete an inventory item
router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;
