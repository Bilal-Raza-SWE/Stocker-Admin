const connection = require("../../config/db");

class Supplier {
  constructor(SupplierID, ItemCategory, SupplierName, QuantitySupplied, SupplierAddress, ItemsSupplied) {
    this.SupplierID = SupplierID;
    this.ItemCategory = ItemCategory;
    this.SupplierName = SupplierName;
    this.QuantitySupplied = QuantitySupplied;
    this.SupplierAddress = SupplierAddress;
    this.ItemsSupplied = ItemsSupplied;
  }

  // Validate supplier data before insertion
  validateSupplierData() {
    if (!this.ItemCategory) throw new Error("Item Category is required");
    if (!this.SupplierName) throw new Error("Supplier Name is required");
    if (!this.QuantitySupplied) throw new Error("Quantity Supplied is required");
    if (!this.SupplierAddress) throw new Error("Supplier Address is required");
    if (!this.ItemsSupplied) throw new Error("Items Supplied is required");
  }
}

// Function to insert a new supplier record
const insertSupplier = (supplierData, callback) => {
  const supplier = new Supplier(
    supplierData.SupplierID,
    supplierData.ItemCategory,
    supplierData.SupplierName,
    supplierData.QuantitySupplied,
    supplierData.SupplierAddress,
    supplierData.ItemsSupplied
  );

  try {
    supplier.validateSupplierData();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO supplier(SupplierID, ItemCategory, SupplierName, QuantitySupplied, SupplierAddress, ItemsSupplied) VALUES (?, ?, ?, ?, ?, ?)`;


  connection.query(
    query,
    [supplier.SupplierID, supplier.ItemCategory, supplier.SupplierName, supplier.QuantitySupplied, supplier.SupplierAddress, supplier.ItemsSupplied],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

module.exports = {
  insertSupplier,
};
