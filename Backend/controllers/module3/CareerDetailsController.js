const carrierDetailsModel = require("../../models/module3/CareerDetailsModel");

const addCarrierDetailsController = (req, res) => {
  const carrierData = req.body;

  carrierDetailsModel.addCarrierDetails(carrierData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Carrier details added successfully.",
    });
  });
};

const getAllCarrierDetailsController = (req, res) => {
  carrierDetailsModel.getAllCarrierDetails((err, results) => {
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
  addCarrierDetailsController,
  getAllCarrierDetailsController,
};
