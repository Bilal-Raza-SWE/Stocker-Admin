const scheduleShipmentModel = require("../../models/module3/ScheduleShipmentsModel");

const addShipmentController = (req, res) => {
  const shipmentData = req.body;

  scheduleShipmentModel.addShipment(shipmentData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Shipment record added successfully.",
    });
  });
};

module.exports = {
  addShipmentController,
};
