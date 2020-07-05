const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/deliveryReady', (req, res) => {
    logger.info('GET DELIVERY READY ORDERS');
    try{
        db.executeStoredProcedure(sp.GET_DELIVERY_READY_ORDERS, {}, () => {
            return res.status(200).send();
        });
    }
    catch(error){
        logger.error('GET DELIVERY READY ORDERS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/activeOrderReadyProducts', (req, res) => {
    logger.info('GET ACTIVE ORDER READY PRODUCTS');
    try{
        db.executeStoredProcedure(sp.GET_ACTIVE_ORDER_READY_PRODUCTS, {orderId: req.body.params}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('GET ACTIVE ORDER READY PRODUCTS ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:businessId', (req, res) => {
    logger.info('GET ACTIVE ORDERS FOR BUSINESS');
    try{
        db.executeStoredProcedure(sp.GET_ACTIVE_ORDER_PRODUCTS, {businessId:req.params.businessId}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('GET ACTIVE ORDERS FOR BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW ORDER');
    try{
        db.executeStoredProcedure(sp.CREATE_ORDER, req.body.params, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('INSERT NEW ORDER ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/completeProduct', (req, res) => {
    logger.info('COMPLETE ORDER PRODUCT');
    try{
        db.executeStoredProcedure(sp.COMPLETE_ORDER_PRODUCT, req.body.params, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('COMPLETE ORDER PRODUCT ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/assignDriver', (req, res) => {
    logger.info('ASSIGN ORDER DRIVER');
    try{
        db.executeStoredProcedure(sp.ASSIGN_ORDER_DRIVER, req.body.params, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('ASSIGN ORDER DRIVER ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;