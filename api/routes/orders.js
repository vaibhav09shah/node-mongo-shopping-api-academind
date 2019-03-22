const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

// Importing Models
//const Order = require('../models/orders');
//const Product = require('../models/products');

// Importing Controller
const OrdersController = require('../controllers/order');

router.get('/', checkAuth, OrdersController.order_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.get_order_details);

router.delete('/:orderId', checkAuth, OrdersController.delete_order_id);



module.exports = router;