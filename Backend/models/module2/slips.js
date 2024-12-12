const connection = require("../../config/db");

class Slip {
  constructor(orderID, shipmentID, dateofShipment, sendersName, sendersAddress, weight, packageType, quantity, itemNames, recipientsAddress, recipientsName) {
    this.orderID = orderID;
    this.shipmentID = shipmentID;
    this.dateofShipment = dateofShipment;
    this.sendersName = sendersName;
    this.sendersAddress = sendersAddress;
    this.weight = weight;
    this.packageType = packageType;
    this.quantity = quantity;
    this.itemNames = itemNames;
    this.recipientsAddress = recipientsAddress;
    this.recipientsName = recipientsName;
  }

  // Validate the data before insertion
  validateAddSlip() {
    if (!this.orderID) throw new Error("Order ID is required");
    if (!this.shipmentID) throw new Error("Shipment ID is required");
    if (!this.sendersName) throw new Error("Sender's Name is required");
    if (!this.sendersAddress) throw new Error("Sender's Address is required");
    if (!this.weight) throw new Error("Weight is required");
    if (!this.packageType) throw new Error("Package Type is required");
    if (!this.quantity) throw new Error("Quantity is required");
    if (!this.itemNames) throw new Error("Item Names are required");
    if (!this.recipientsAddress) throw new Error("Recipient's Address is required");
    if (!this.recipientsName) throw new Error("Recipient's Name is required");
  }
}

// Insert a new slip record into the database
const addSlip = (slipData, callback) => {
  const slip = new Slip(
    slipData.orderID,
    slipData.shipmentID,
    slipData.dateofShipment,
    slipData.sendersName,
    slipData.sendersAddress,
    slipData.weight,
    slipData.packageType,
    slipData.quantity,
    slipData.itemNames,
    slipData.recipientsAddress,
    slipData.recipientsName
  );

  try {
    slip.validateAddSlip();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO slips (orderID, shipmentID, dateofShipment, sendersName, sendersAddress, weight, packageType, quantity, itemNames, recipientsAddress, recipientsName)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      slip.orderID,
      slip.shipmentID,
      slip.dateofShipment,
      slip.sendersName,
      slip.sendersAddress,
      slip.weight,
      slip.packageType,
      slip.quantity,
      slip.itemNames,
      slip.recipientsAddress,
      slip.recipientsName,
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Get all slip records by orderID from the database
const getSlipsByOrderID = (orderID, callback) => {
  const query = "SELECT * FROM slips WHERE orderID = ?";
  connection.query(query, [orderID], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  addSlip,
  getSlipsByOrderID,
};
