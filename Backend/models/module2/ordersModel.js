const connection = require("../../config/db"); // Ensure the path to your DB config is correct

// Add a new order
const addOrder = (orderData, callback) => {
  const { Orderid, customerName, Items, quantity, dispatchDate, status } = orderData;

  const query = `
    INSERT INTO orders (Orderid, customerName, Items, quantity, dispatchDate, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [Orderid, customerName, Items, quantity, dispatchDate, status],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    }
  );
};

// Get all orders
const getAllOrders = (callback) => {
  const query = "SELECT * FROM orders";

  connection.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  addOrder,
  getAllOrders,
};
