const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {

});

router.get('/:orderId', (req, res) => {

});

router.post('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports.orderController = router;