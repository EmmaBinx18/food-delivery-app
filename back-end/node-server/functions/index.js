const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const cors = require('cors');

const userController = require('./routes/user/user.controller');
const businessController = require('./routes/business/business.controller');
const productsController = require('./routes/products/products.controller');
const ordersController = require('./routes/orders/orders.controller');
const categoryController = require('./routes/category/category.controller');
const addressController = require('./routes/address/address.controller');
const deliveryController = require('./routes/delivery/delivery.controller');
const adminController = require('./routes/admin/admin.controller')

const app = express();

app.use(timeout(360000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) return next();
}

app.use('/user', userController);
app.use('/business', businessController);
app.use('/products', productsController);
app.use('/orders', ordersController);
app.use('/category', categoryController);
app.use('/address', addressController);
app.use('/delivery', deliveryController);
app.use('/admin',adminController);

exports.app = functions.https.onRequest(app);