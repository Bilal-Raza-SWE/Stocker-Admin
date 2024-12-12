const connection = require("../../config/db");

class Stock {
  constructor(stockID, itemName, itemCategory, quantity, inventoryLevel, description, barCode) {
    this.stockID = stockID;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.quantity = quantity;
    this.inventoryLevel = inventoryLevel;
    this.description = description;
    this.barCode = barCode;
  }

  validateAddItem() {
    if (!this.itemName) throw new Error("Item Name is required");
    if (!this.itemCategory) throw new Error("Item Category is required");
    if (this.quantity === undefined || this.quantity === null) throw new Error("Quantity is required");
    if (!this.barCode) throw new Error("BarCode is required");
  }

  validateUpdateQuantity() {
    if (!this.itemName) throw new Error("Item Name is required");
    if (!this.itemCategory) throw new Error("Item Category is required");
    if (!this.barCode) throw new Error("BarCode is required");
    if (this.quantity === undefined || this.quantity === null) throw new Error("Quantity is required");
  }

  validateUpdateStockLevel() {
    if (!this.stockID) throw new Error("Stock ID is required");
    if (this.inventoryLevel === undefined || this.inventoryLevel === null) throw new Error("Inventory Level is required");
    if (!this.description) throw new Error("Description is required");
  }
}

// Add new item to the stock
const addItem = (stockData, callback) => {
  const stock = new Stock(
    null, // stockID is auto-incremented
    stockData.itemName,
    stockData.itemCategory,
    stockData.quantity,
    null,
    null,
    stockData.barCode
  );

  try {
    stock.validateAddItem();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO stock (itemName, itemCategory, quantity, barCode) VALUES (?, ?, ?, ?)`;
  connection.query(
    query,
    [stock.itemName, stock.itemCategory, stock.quantity, stock.barCode],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Update the quantity of an item
const updateItemQuantity = (stockData, callback) => {
  const stock = new Stock(
    null,
    stockData.itemName,
    stockData.itemCategory,
    stockData.quantity,
    null,
    null,
    stockData.barCode
  );

  try {
    stock.validateUpdateQuantity();
  } catch (error) {
    return callback(error, null);
  }

  const query = `UPDATE stock SET quantity = ? WHERE itemName = ? AND itemCategory = ? AND barCode = ?`;
  connection.query(
    query,
    [stock.quantity, stock.itemName, stock.itemCategory, stock.barCode],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Update stock inventory level
const updateStockLevel = (stockData, callback) => {
  const stock = new Stock(
    stockData.stockID,
    stockData.itemCategory,
    stockData.itemName,
    null,
    stockData.inventoryLevel,
    stockData.description,
    null
  );

  try {
    stock.validateUpdateStockLevel();
  } catch (error) {
    return callback(error, null);
  }

  const query = `UPDATE stock SET inventoryLevel = ?, description = ? WHERE stockID = ?`;
  connection.query(
    query,
    [stock.inventoryLevel, stock.description, stock.stockID],
    (err, result) => {
      if (err) return callback(err, null);

      if (result.affectedRows === 0) {
        return callback(new Error("Item not found or no changes made."), null);
      }

      callback(null, result);
    }
  );
};

module.exports = {
  addItem,
  updateItemQuantity,
  updateStockLevel,
};
