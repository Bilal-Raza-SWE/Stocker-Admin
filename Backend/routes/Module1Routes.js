const express = require("express");
const { addItemController, updateItemQuantityController,updateStockLevelController} = require("../controllers/module1/stockController");
const{insertSupplierController}=require("../controllers/module1/supplierController")
const {addManagerController}=require("../controllers/module1/ManagerRecordController")

const router = express.Router();

router.post("/add", addItemController); 
router.put("/updatequantity", updateItemQuantityController); 
router.put("/updatestocklevel", updateStockLevelController);
router.post("/addsupplier",insertSupplierController);
router.post("/addmanager",addManagerController);



module.exports = router;
