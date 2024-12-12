const itemModel = require("../../models/module2/itemsModel");

// Controller to add a new item
const addItemController = (req, res) => {
  const itemData = req.body;

  itemModel.addItem(itemData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Item added successfully.",
    });
  });
};

// Controller to get all items
const getAllItemsController = (req, res) => {
  itemModel.getAllItems((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};


module.exports = {
  addItemController,
  getAllItemsController,
};
