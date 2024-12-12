const supplierModel = require("../../models/module1/supplierinfoModel");

// Controller to handle inserting supplier data
const insertSupplierController = (req, res) => {
  const { SupplierID, ItemCategory, SupplierName, QuantitySupplied, SupplierAddress, ItemsSupplied } = req.body;

  // Ensure all required fields are provided
  if (!SupplierID || !ItemCategory || !SupplierName || !QuantitySupplied|| !SupplierAddress || !ItemsSupplied) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: SupplierID, ItemCategory, SupplierName, QuantitySupplied, SupplierAddress, and ItemsSupplied.",
    });
  }

  // Call the model to insert the supplier data
  supplierModel.insertSupplier(
    { SupplierID, ItemCategory, SupplierName, QuantitySupplied, SupplierAddress, ItemsSupplied },
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      return res.status(201).json({
        success: true,
        message: "Supplier data inserted successfully.",
      });
    }
  );
};

module.exports = {
  insertSupplierController,
};
