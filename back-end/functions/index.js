const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const {
  userController,
  businessController,
  homeChefController,
  orderController
} = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.use('/user', userController);
app.use('/business', businessController);
app.use('/homeChef', homeChefController);
app.use('/orders', orderController);

exports.app = functions.https.onRequest(app);