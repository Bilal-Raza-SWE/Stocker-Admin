const managerModel = require("../../models/module1/ManagerRecordModel");

const addManagerController = (req, res) => {
  const managerData = req.body;

  managerModel.addManagerrecord(managerData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Manager record added successfully.",
    });
  });
};

module.exports = {
  addManagerController,
};
