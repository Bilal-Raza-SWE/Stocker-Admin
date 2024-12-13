// routes/inventoryRoutes.js
const express = require("express");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

// Route definitions
router.post("/", inventoryController.createItem);
router.get("/", inventoryController.getAllItems);
router.get("/:id", inventoryController.getItemById);
router.put("/:id", inventoryController.updateItem);
router.delete("/:id", inventoryController.deleteItem);

module.exports = router;
