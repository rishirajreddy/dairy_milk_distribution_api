const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post("/add", orderController.addOrder);
router.patch("/update/:id", orderController.updateOrder);
router.patch("/updateStatus/:id", orderController.updateOrderStatus);
router.delete("/delete/:id", orderController.deleteOrder);
router.get("/checkCapacity/:date", orderController.checkCapacity);

module.exports = router;