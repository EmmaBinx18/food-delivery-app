const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./routes/user/user.controller');
const businessController = require('./routes/business/business.controller');
const productsController = require('./routes/products/products.controller');
// const ordersController = require('./routes/orders/orders.controller');
const categoryController = require('./routes/category/category.controller');
const addressController = require('./routes/address/address.controller');
const deliveryController = require('./routes/delivery/delivery.controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.use('/user', userController);
app.use('/business', businessController);
app.use('/products', productsController);
// app.use('/orders', ordersController);
app.use('/category', categoryController);
app.use('/address', addressController);
app.use('/delivery', deliveryController);

exports.app = functions.https.onRequest(app);