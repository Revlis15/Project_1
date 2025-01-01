const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require('./order.controller');
const router = express.Router();

// create order endpoint
router.post("/create-order", createAOrder); 

// get order by email
router.get("/email/:email", getOrderByEmail);

// get all orders
router.get("/", getAllOrders);

// update order status
router.put("/:id/status", updateOrderStatus);

module.exports = router;