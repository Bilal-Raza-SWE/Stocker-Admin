const notifyCustomerModel = require("../../models/module3/CustomerModel");

// Controller to add a new notify_customer record
const addNotifyCustomerController = (req, res) => {
  const notifyData = req.body;

  notifyCustomerModel.addNotifyCustomer(notifyData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Customer notification added successfully.",
    });
  });
};

// Controller to get all notify_customer records
const getAllNotifyCustomersController = (req, res) => {
  notifyCustomerModel.getAllNotifyCustomers((err, results) => {
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
  addNotifyCustomerController,
  getAllNotifyCustomersController,
};
