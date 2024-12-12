const connection = require("../../config/db");

class Item {
  constructor(itemName) {
    this.itemName = itemName;
  }

  // Validate the data before insertion
  validateAddItem() {
    if (!this.itemName) throw new Error("Item name is required");
  }
}

// Insert a new item record into the database
const addItem = (itemData, callback) => {
  const item = new Item(itemData.itemName);

  try {
    item.validateAddItem();
  } catch (error) {
    return callback(error, null);
  }

  const query = "INSERT INTO item (items) VALUES (?)";

  connection.query(query, [item.itemName], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// Get all items from the database
const getAllItems = (callback) => {
  const query = "SELECT * FROM item";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};



module.exports = {
  addItem,
  getAllItems,
};
