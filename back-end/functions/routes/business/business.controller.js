const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {

});

router.get('/:uid', (req, res) => {

});

router.post('/changeRegisterStatus', (req, res) => {

});

router.post('/createUserWithAddress', (req, res) => {

});

router.delete('', (req, res) => {

});

router.patch('/', (req, res) => {

});

module.exports.businessController = router;