const connection = require("../../config/db");

class DeliveryStatus {
  constructor(orderID, customerName, items, quantity, dispatchDate, updatedStatus) {
    this.orderID = orderID;
    this.customerName = customerName;
    this.items = items;
    this.quantity = quantity;
    this.dispatchDate = dispatchDate;
    this.updatedStatus = updatedStatus;
  }

  validateAddDeliveryStatus() {
    if (!this.orderID) throw new Error("Order ID is required");
    if (!this.customerName) throw new Error("Customer Name is required");
    if (!this.items) throw new Error("Items are required");
    if (!this.quantity) throw new Error("Quantity is required");
    if (!this.dispatchDate) throw new Error("Dispatch Date is required");
    if (!this.updatedStatus) throw new Error("Status detail are required");


  }
}

const addDeliveryStatus = (deliveryData, callback) => {
  const deliveryStatus = new DeliveryStatus(
    deliveryData.orderID,
    deliveryData.customerName,
    deliveryData.items,
    deliveryData.quantity,
    deliveryData.dispatchDate,
    deliveryData.updatedStatus
  );

  try {
    deliveryStatus.validateAddDeliveryStatus();
  } catch (error) {
    return callback(error, null);
  }

  const query = `INSERT INTO delivery_status (orderID, customerName, items, quantity, dispatchDate, updatedStatus) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      deliveryStatus.orderID,
      deliveryStatus.customerName,
      deliveryStatus.items,
      deliveryStatus.quantity,
      deliveryStatus.dispatchDate,
      deliveryStatus.updatedStatus
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

const getAllDeliveryStatuses = (callback) => {
  const query = "SELECT * FROM delivery_status";
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  addDeliveryStatus,
  getAllDeliveryStatuses,
};
