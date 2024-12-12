const errorModel = require("../../models/module2/errorModel");

// Controller to add a new error
const addErrorController = (req, res) => {
  const errorData = req.body;

  errorModel.addError(errorData, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    return res.status(201).json({
      success: true,
      message: "Error added successfully.",
    });
  });
};

module.exports = {
  addErrorController,
};
