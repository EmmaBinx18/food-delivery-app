const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL BUSINESSES');
    try {
        return db.executeStoredProcedure(sp.business.GET_BUSINESS, { businessId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL BUSINESSES ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:businessId', (req, res) => {
    logger.info('GET BUSINESS BY ID');
    try {
        return db.executeStoredProcedure(sp.business.GET_BUSINESS, { businessId: req.params.businessId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET BUSINESS BY ID ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/user/:userId', (req, res) => {
    logger.info('GET BUSINESS BY USER ID');
    try {
        return db.executeStoredProcedure(sp.business.GET_BUSINESS_USER, { userId: req.params.userId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET BUSINESS BY USER ID ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW BUSINESS');
    try {
        return db.executeStoredProcedure(sp.business.CREATE_UPDATE_BUSINESS, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('INSERT NEW BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE BUSINESS');
    try {
        return db.executeStoredProcedure(sp.business.CREATE_UPDATE_BUSINESS, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('UPDATE BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/category/:categoryId', (req, res) => {
    logger.info('GET BUSINESSES BY CATEGORY');
    try {
        return db.executeStoredProcedure(sp.business.GET_BUSINESS_CATEGORY, { categoryId: req.params.categoryId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET BUSINESSES BY CATEGORY ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/operationalStatus', (req, res) => {
    logger.info('GET ALL OPERATIONAL STATUSES');
    try {
        return db.executeStoredProcedure(sp.business.GET_OPERATIONAL_STATUS, { operationalStatusId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL OPERATIONAL STATUSES ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/operationalStatus/:operationalStatusId', (req, res) => {
    logger.info('GET OPERATIONAL STATUS BY ID');
    try {
        return db.executeStoredProcedure(sp.business.GET_OPERATIONAL_STATUS, { operationalStatusId: req.params.operationalStatusId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET OPERATIONAL STATUS BY ID ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;