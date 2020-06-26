const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const userController = require('./routes/user/user.controller');
const businessController = require('./routes/business/business.controller');
const homeChefController = require('./routes/home-chef/home-chef.controller');
const ordersController = require('./routes/orders/orders.controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.use('/user', userController);
app.use('/business', businessController);
app.use('/homeChef', homeChefController);
app.use('/orders', ordersController);

exports.app = functions.https.onRequest(app);