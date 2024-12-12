const deliveryStatusModel = require("../../models/module3/DeliveryModel");

const addDeliveryStatusController = (req, res) => {
  const deliveryData = req.body;

  deliveryStatusModel.addDeliveryStatus(deliveryData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Delivery status added successfully.",
    });
  });
};

const getAllDeliveryStatusesController = (req, res) => {
  deliveryStatusModel.getAllDeliveryStatuses((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  addDeliveryStatusController,
  getAllDeliveryStatusesController,
};
