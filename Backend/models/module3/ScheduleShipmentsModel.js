const connection = require("../../config/db");

class Shipment {
  constructor(shipmentID, recipientsName, dateOfShipment, senderName, senderAddress, recipientsAddress, dispatchDate) {
    this.shipmentID = shipmentID;
    this.recipientsName = recipientsName;
    this.dateOfShipment = dateOfShipment;
    this.senderName = senderName;
    this.senderAddress = senderAddress;
    this.recipientsAddress = recipientsAddress;
    this.dispatchDate = dispatchDate;
  }

  validateAddShipment() {
    if (!this.recipientsName) throw new Error("Recipient's name is required");
    if (!this.dateOfShipment) throw new Error("Date of shipment is required");
    if (!this.senderName) throw new Error("Sender's name is required");
    if (!this.senderAddress) throw new Error("Sender's address is required");
    if (!this.recipientsAddress) throw new Error("Recipient's address is required");
    if (!this.dispatchDate) throw new Error("Dispatch date is required");
  }
}

// Insert a new shipment into the database
const addShipment = (shipmentData, callback) => {
  const shipment = new Shipment(
    shipmentData.shipmentID,
    shipmentData.recipientsName,
    shipmentData.dateOfShipment,
    shipmentData.senderName,
    shipmentData.senderAddress,
    shipmentData.recipientsAddress,
    shipmentData.dispatchDate
  );

  try {
    shipment.validateAddShipment();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO schedule_shipments (shipmentID,recipientsName,dateofshipment,senderName,senderAddress, recipientsAddress,dispatchDate) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      shipment.shipmentID,
      shipment.recipientsName,
      shipment.dateOfShipment,
      shipment.senderName,
      shipment.senderAddress,
      shipment.recipientsAddress,
      shipment.dispatchDate
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

module.exports = {
  addShipment,
};
