const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.post('/register', (req, res) => {
    logger.info('INSERT NEW DRIVER');
    try {
        db.executeStoredProcedure(sp.ADD_TO_DRIVER_ROLE, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('INSERT NEW DRIVER ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:driverId', (req, res) => {
    logger.info('GET DELIVERIES FOR DRIVER');
    try {
        db.executeStoredProcedure(sp.GET_DRIVER_ORDER, { driverId: req.params.driverId, deliveryStatusId: 1 }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET DELIVERIES FOR DRIVER ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;