const connection = require("../../config/db");

class Manager {
  constructor(StockID, ItemName, ItemCategory, ReportingManagerName, Discrepancies) {
    this.StockID = StockID;
    this.ItemName = ItemName;
    this.ItemCategory = ItemCategory;
    this.ReportingManagerName = ReportingManagerName;
    this.Discrepancies = Discrepancies;
  }

  // Validate the data before insertion
  validateAddItem() {
    if (!this.StockID) throw new Error("Stock id  is required");
    if (!this.ItemName) throw new Error("Item Name is required");
    if (!this.ItemCategory) throw new Error("Item Category is required");
    if (!this.ReportingManagerName) throw new Error("Reporting Manager Name is required");
    if (!this.Discrepancies) throw new Error("Discrepancies is required");
  }
}

// Insert a new manager item into the database
const addManagerrecord = (managerData, callback) => {
  const manager = new Manager(
    managerData.StockID,
    managerData.ItemName,
    managerData.ItemCategory,
    managerData.ReportingManagerName,
    managerData.Discrepancies
  );

  try {
    manager.validateAddItem();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO manager (StockID, ItemName,ItemCategory,ReportingManagerName, Discrepancies) 
                 VALUES (?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [manager.StockID, manager.ItemName, manager.ItemCategory, manager.ReportingManagerName, manager.Discrepancies],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

module.exports = {
  addManagerrecord,
};
