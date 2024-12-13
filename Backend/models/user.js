const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Manager", "Employee", "User"], required: true },
  status: { type: String, enum: ["Active", "Inactive", "Pending"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
