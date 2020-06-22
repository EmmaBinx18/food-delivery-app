const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/meals', (req, res) => {

});

router.get('/meals/:mealid', (req, res) => {

});

router.post('/addMeal', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports.homeChefController = router;