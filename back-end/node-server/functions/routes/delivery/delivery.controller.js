const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.post('/register', (req, res) => {
    logger.info('INSERT NEW DRIVER');
    try {
        return db.executeStoredProcedure(sp.delivery.ADD_TO_DRIVER_ROLE, req.body.params, (data) => {
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
        return db.executeStoredProcedure(sp.delivery.GET_DRIVER_ORDER, { driverId: req.params.driverId, deliveryStatusId: 1 }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET DELIVERIES FOR DRIVER ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/pickupOrder', (req, res) => {
    console.log(req.body.params);
    logger.info('PICK UP ORDER');
    try {
        return db.executeStoredProcedure(sp.delivery.PICK_UP_ORDER, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('PICK UP ORDER ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/completeDelivery', (req, res) => {
    logger.info('COMPLETE ORDER DELIVERY');
    try {
        return db.executeStoredProcedure(sp.delivery.COMPLETE_ORDER_DELIVERY, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('COMPLETE ORDER DELIVERY ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;