const express = require("express");
const router = express.Router();

const {getSlipsByOrderIDController,addSlipController}=require("../controllers/module2/slipController")
const {addItemController,getAllItemsController}=require("../controllers/module2/itemController")
const { addErrorController,  } = require("../controllers/module2/errorController");
const { addOrderController, getAllOrdersController } = require("../controllers/module2/ordersController");

// router.post("/addslip", addSlipController);
// router.get("/:orderID", getSlipsByOrderIDController);

router.post("/add", addItemController);
router.get("/",getAllItemsController);


router.post("/adderror", addErrorController);
//order routes

// Route to add a new order
router.post("/addorder", addOrderController);
router.get("/all", getAllOrdersController);


module.exports = router;


module.exports = router;
