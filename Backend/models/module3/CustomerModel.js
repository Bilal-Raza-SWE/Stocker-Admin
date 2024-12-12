const connection = require("../../config/db");

class NotifyCustomer {
  constructor(orderID, shipmentID, customerName, customerAddress, customerContactNo, itemName, quantity, itemDispatchDate, carrierCompanyName, carrierCompanyContactInfo, message, receivingDate) {
    this.orderID = orderID;
    this.shipmentID = shipmentID;
    this.customerName = customerName;
    this.customerAddress = customerAddress;
    this.customerContactNo = customerContactNo;
    this.itemName = itemName;
    this.quantity = quantity;
    this.itemDispatchDate = itemDispatchDate;
    this.carrierCompanyName = carrierCompanyName;
    this.carrierCompanyContactInfo = carrierCompanyContactInfo;
    this.message = message;
    this.receivingDate = receivingDate;
  }

  // Validate the data before insertion
  validateAddNotifyCustomer() {
    if (!this.orderID) throw new Error("Order ID is required");
    if (!this.shipmentID) throw new Error("Shipment ID is required");
    if (!this.customerName) throw new Error("Customer Name is required");
    if (!this.customerAddress) throw new Error("Customer Address is required");
    if (!this.customerContactNo) throw new Error("Customer Contact No is required");
    if (!this.itemName) throw new Error("Item Name is required");
    if (!this.quantity) throw new Error("Quantity is required");
    if (!this.itemDispatchDate) throw new Error("Item Dispatch Date is required");
    if (!this.carrierCompanyName) throw new Error("Carrier Company Name is required");
    if (!this.carrierCompanyContactInfo) throw new Error("Carrier Company Contact Info is required");
    if (!this.message) throw new Error("Message is required");
    if (!this.receivingDate) throw new Error("receivingDate is required");

  }
}

// Insert a new notify_customer record into the database
const addNotifyCustomer = (notifyData, callback) => {
  const notifyCustomer = new NotifyCustomer(
    notifyData.orderID,
    notifyData.shipmentID,
    notifyData.customerName,
    notifyData.customerAddress,
    notifyData.customerContactNo,
    notifyData.itemName,
    notifyData.quantity,
    notifyData.itemDispatchDate,
    notifyData.carrierCompanyName,
    notifyData.carrierCompanyContactInfo,
    notifyData.message,
    notifyData.receivingDate
  );

  try {
    notifyCustomer.validateAddNotifyCustomer();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO notify_customer (orderID, shipmentID, customerName, customerAddress, customerContactNo, itemName, quantity, itemDispatchDate, carrierCompanyName, carrierCompanyContactInfo, message, receivingDate) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      notifyCustomer.orderID,
      notifyCustomer.shipmentID,
      notifyCustomer.customerName,
      notifyCustomer.customerAddress,
      notifyCustomer.customerContactNo,
      notifyCustomer.itemName,
      notifyCustomer.quantity,
      notifyCustomer.itemDispatchDate,
      notifyCustomer.carrierCompanyName,
      notifyCustomer.carrierCompanyContactInfo,
      notifyCustomer.message,
      notifyCustomer.receivingDate,
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// Get all notify_customer records from the database
const getAllNotifyCustomers = (callback) => {
  const query = "SELECT * FROM notify_customer";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  addNotifyCustomer,
  getAllNotifyCustomers,
};
