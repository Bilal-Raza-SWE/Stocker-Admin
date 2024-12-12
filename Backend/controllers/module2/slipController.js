const slipModel = require("../../models/module2/slips");

// Controller to add a new slip record
const addSlipController = (req, res) => {
  const slipData = req.body;

  slipModel.addSlip(slipData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Slip added successfully.",
    });
  });
};

// Controller to get slips by orderID
const getSlipsByOrderIDController = (req, res) => {
  const orderID = req.params.orderID;

  slipModel.getSlipsByOrderID(orderID, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No slips found for this order ID.",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  addSlipController,
  getSlipsByOrderIDController,
};
