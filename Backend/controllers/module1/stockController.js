const stockModel = require("../../models/module1/stockModel");

const addItemController = (req, res) => {
  const stockData = req.body;

  stockModel.addItem(stockData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Item added successfully.",
      itemId: result.insertId,
    });
  });
};

// Controller for updating the quantity of an item
const updateItemQuantityController = (req, res) => {
  const { barCode, itemCategory, itemId, itemName, quantity } = req.body;

  stockModel.updateItemQuantity({ itemCategory, itemId, itemName, quantity, barCode }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item quantity updated successfully.",
    });
  });
};

// Controller for updating the stock inventory level
const updateStockLevelController = (req, res) => {
  const { itemName,itemCategory,stockID, inventoryLevel, description } = req.body;

  if (!stockID ||!itemName||!itemCategory||!inventoryLevel || !description) {
    return res.status(400).json({
      success: false,
      message: " itemname,itemcategory ,Stock ID, inventory level, and description are required.",
    });
  }

  stockModel.updateStockLevel({ itemCategory,itemName,stockID, inventoryLevel, description }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found or no changes made.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Stock inventory level updated successfully.",
    });
  });
};

module.exports = {
  addItemController,
  updateItemQuantityController,
  updateStockLevelController,
};
