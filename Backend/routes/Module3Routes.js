const express = require("express");
const router = express.Router();

const {addShipmentController} = require("../controllers/module 3/ScheduleShipmentsController");
const {getAllCarrierDetailsController,addCarrierDetailsController}=require("../controllers/module 3/CareerDetailsController")
const{addOutgoingRecordController,getAllOutgoingRecordsController}=require("../controllers/module 3/RecordShipmentController")
const {getAllDeliveryStatusesController,addDeliveryStatusController}=require("../controllers/module 3/DeliveryController")
const {addNotifyCustomerController,getAllNotifyCustomersController}=require("../controllers/module 3/CustomerController")

router.post("/addshipment",addShipmentController);

router.get("/carrierDetails",getAllCarrierDetailsController);
router.post("/addcarrier",addCarrierDetailsController);

router.post("/addoutgoing",addOutgoingRecordController);
router.get("/outgoing",getAllOutgoingRecordsController);

router.post("/adddel",addDeliveryStatusController);
router.get("/del", getAllDeliveryStatusesController);

router.post("/addcustomer", addNotifyCustomerController);
router.get("/getcustomer", getAllNotifyCustomersController);



module.exports = router;
