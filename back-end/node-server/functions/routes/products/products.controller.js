const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL PRODUCTS');
    try {
        db.executeStoredProcedure(sp.GET_PRODUCTS_CATEGORY, { categoryid: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL PRODUCTS ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/business/:businessId', (req, res) => {
    logger.info('GET ALL PRODUCTS FOR A BUSINESS');
    try {
        db.executeStoredProcedure(sp.GET_PRODUCTS_BUSINESS, { businessId: req.params.businessId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL PRODUCTS FOR A BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW PRODUCT');
    try {
        db.executeStoredProcedure(sp.CREATE_UPDATE_PRODUCT, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('INSERT NEW PRODUCT ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/remove', (req, res) => {
    logger.info('REMOVE PRODUCT');
    try {
        db.executeStoredProcedure(sp.UPDATE_PRODUCT_STATUS, { productId: req.body.params, availabilityStatus: '1' }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('REMOVE PRODUCT ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE PRODUCT');
    try {
        db.executeStoredProcedure(sp.CREATE_UPDATE_PRODUCT, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('IUPDATE PRODUCT ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;