const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {

});

router.get('/:uid', (req, res) => {

});

router.get('/:businessId', (req, res) => {

});

router.post('/changeRegistrationStatus', (req, res) => {

});

router.delete('/:businessId', (req, res) => {

});

router.patch('/:businessId', (req, res) => {

});

module.exports.businessController = router;