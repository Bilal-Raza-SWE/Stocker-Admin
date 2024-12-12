const connection = require("../../config/db");

class Error {
  constructor(orderID, itemsName, shipmentID, packingErrorDescription) {
    this.orderID = orderID;
    this.itemsName = itemsName;
    this.shipmentID = shipmentID;
    this.packingErrorDescription = packingErrorDescription;
  }

  // Validate the data before insertion
  validateAddError() {
    if (!this.orderID || !this.itemsName || !this.shipmentID || !this.packingErrorDescription) {
      throw new Error("All fields are required.");
    }
  }
}

// Insert a new error record into the database
const addError = (errorData, callback) => {
  const error = new Error(
    errorData.orderID,
    errorData.itemsName,
    errorData.shipmentID,
    errorData.packingErrorDescription
  );

  try {
    error.validateAddError();
  } catch (validationError) {
    return callback(validationError, null);
  }

  const query = "INSERT INTO errors (orderID, itemsName, shipmentID, packingErrorDescription) VALUES (?, ?, ?, ?)";

  connection.query(
    query,
    [error.orderID, error.itemsName, error.shipmentID, error.packingErrorDescription],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};



module.exports = {
  addError,
  
};
