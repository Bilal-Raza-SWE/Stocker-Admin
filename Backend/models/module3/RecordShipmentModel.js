const connection = require("../../config/db");

class OutgoingRecord {
  constructor(shipmentID, itemName, quantity, dispatchDate, trackingNumber, carrierName, destination) {
    this.shipmentID = shipmentID;
    this.itemName = itemName;
    this.quantity = quantity;
    this.dispatchDate = dispatchDate;
    this.trackingNumber = trackingNumber;
    this.carrierName = carrierName;
    this.destination = destination;
  }

  // Validate the data before insertion
  validateAddOutgoingRecord() {
    if (!this.shipmentID) throw new Error("Shipment ID is required");
    if (!this.itemName) throw new Error("Item Name is required");
    if (!this.quantity) throw new Error("Quantity is required");
    if (!this.dispatchDate) throw new Error("Dispatch Date is required");
    if (!this.trackingNumber) throw new Error("Tracking Number is required");
    if (!this.carrierName) throw new Error("Carrier Name is required");
    if (!this.destination) throw new Error("Destination is required");
  }
}

// Insert a new outgoing record into the database
const addOutgoingRecord = (outgoingData, callback) => {
  const outgoingRecord = new OutgoingRecord(
    outgoingData.shipmentID,
    outgoingData.itemName,
    outgoingData.quantity,
    outgoingData.dispatchDate,
    outgoingData.trackingNumber,
    outgoingData.carrierName,
    outgoingData.destination
  );

  try {
    outgoingRecord.validateAddOutgoingRecord();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO outgoing_record (shipmentID, itemName, quantity, dispatchDate, trackingNumber, carrierName, destination) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      outgoingRecord.shipmentID,
      outgoingRecord.itemName,
      outgoingRecord.quantity,
      outgoingRecord.dispatchDate,
      outgoingRecord.trackingNumber,
      outgoingRecord.carrierName,
      outgoingRecord.destination
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Get all outgoing records from the database
const getAllOutgoingRecords = (callback) => {
  const query = "SELECT * FROM `outgoing_record`";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  addOutgoingRecord,
  getAllOutgoingRecords,
};
