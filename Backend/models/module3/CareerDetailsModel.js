// ismei add and get ki api bani gi 
const connection = require("../../config/db");

class CarrierDetails {
  constructor(shipmentID, shipmentDate, carrierName, carrierContact, vehicleDetails,status) {
    this.shipmentID = shipmentID;
    this.shipmentDate = shipmentDate;
    this.carrierName = carrierName;
    this.carrierContact = carrierContact;
    this.vehicleDetails = vehicleDetails;
    this.status=status;
  }

  // Validate the data before insertion
  validateAddCarrierDetails() {
    if (!this.shipmentID) throw new Error("Shipment ID is required");
    if (!this.shipmentDate) throw new Error("Shipment Date is required");
    if (!this.carrierName) throw new Error("Carrier Name is required");
    if (!this.carrierContact) throw new Error("Carrier Contact is required");
    if (!this.vehicleDetails) throw new Error("Vehicle Details are required");
    if (!this.status) throw new Error("Status is required");

  }
}

// Insert a new carrier details record into the database
const addCarrierDetails = (carrierData, callback) => {
  const carrierDetails = new CarrierDetails(
    carrierData.shipmentID,
    carrierData.shipmentDate,
    carrierData.carrierName,
    carrierData.carrierContact,
    carrierData.vehicleDetails,
    carrierData.status
  );

  try {
    carrierDetails.validateAddCarrierDetails();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO carrier_details (shipmentID,status,shipmentDate,carrierName,carrierContact,vehicleDetails) 
                 VALUES (?, ?,?, ?, ?, ?)`;

  connection.query(
    query,
    [
      carrierDetails.shipmentID,
      carrierDetails.shipmentDate,
      carrierDetails.carrierName,
      carrierDetails.carrierContact,
      carrierDetails.vehicleDetails,
      carrierDetails.status
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Get all carrier details records from the database
const getAllCarrierDetails = (callback) => {
  const query = "SELECT * FROM `carrier_details`";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  addCarrierDetails,
  getAllCarrierDetails,
};
