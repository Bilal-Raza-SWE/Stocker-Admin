const InventoryItem = require('../models/InventoryItem');

// Get all inventory items
exports.getInventoryItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inventory items' });
  }
};

// Add a new inventory item
exports.addInventoryItem = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  try {
    const newItem = new InventoryItem({ name, description, quantity, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding inventory item' });
  }
};

// Edit an inventory item
exports.editInventoryItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, price } = req.body;
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(id, { name, description, quantity, price }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error editing inventory item' });
  }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inventory item' });
  }
};
