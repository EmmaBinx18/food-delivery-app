const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/meals', (req, res) => {

});

router.get('/meals/:mealId', (req, res) => {

});

router.post('/addMeal', (req, res) => {

});

router.delete('/:mealId', (req, res) => {

});

router.patch('/:mealId', (req, res) => {

});

module.exports.homeChefController = router;