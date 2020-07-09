const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/:addressId', (req, res) => {
    logger.info('GET ADDRESS BY ID');
    try {
        return db.executeStoredProcedure(sp.address.GET_ADDRESS, { addressId: req.params.addressId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ADDRESS BY ID ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW ADDRESS');
    try {
        return db.executeStoredProcedure(sp.address.CREATE_UPDATE_ADDRESS, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('INSERT NEW ADDRESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE ADDRESS');
    try {
        return db.executeStoredProcedure(sp.address.CREATE_UPDATE_USER, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('UPDATE ADDRESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/user/:userId', (req, res) => {
    logger.info('GET ALL ADDRESSES FOR USER');
    try {
        return db.executeStoredProcedure(sp.address.GET_USER_ADDRESS, { userId: req.params.userId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL ADDRESSES FOR USER ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/user/:userId', (req, res) => {
    logger.info('REMOVE ADDRESS FROM USER');
    try {
        return db.executeStoredProcedure(sp.address.DELINK_USER_ADDRESS, { userId: req.params.userId, addressId: req.body.params }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('REMOVE ADDRESS FROM USER ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;