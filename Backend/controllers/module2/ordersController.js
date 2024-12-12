const ordersModel = require("../../models/module2/ordersModel");

// Controller to add a new order
const addOrderController = (req, res) => {
  const orderData = req.body;

  ordersModel.addOrder(orderData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Order added successfully.",
    });
  });
};

// Controller to get all orders
const getAllOrdersController = (req, res) => {
  ordersModel.getAllOrders((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  addOrderController,
  getAllOrdersController,
};
