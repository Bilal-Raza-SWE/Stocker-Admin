const outgoingRecordModel = require("../../models/module3/RecordShipmentModel");

// Controller for adding a new outgoing record
const addOutgoingRecordController = (req, res) => {
  const outgoingData = req.body;

  outgoingRecordModel.addOutgoingRecord(outgoingData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Outgoing record added successfully.",
    });
  });
};

// Controller for getting all outgoing records
const getAllOutgoingRecordsController = (req, res) => {
  outgoingRecordModel.getAllOutgoingRecords((err, results) => {
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
  addOutgoingRecordController,
  getAllOutgoingRecordsController,
};
