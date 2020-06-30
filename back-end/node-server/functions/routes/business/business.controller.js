const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL BUSINESSES');
    try{
        db.executeStoredProcedure(sp.GET_BUSINESS, {businessId:null}, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('GET ALL BUSINESSES ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:businessId', (req, res) => {
    logger.info('GET BUSINESS BY ID');
    try{
        db.executeStoredProcedure(sp.GET_BUSINESS, {businessId:req.params.businessId}, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('GET BUSINESS BY ID ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW BUSINESS');
    const newBusiness = {
        businessId: -1,
        name: req.body.params.name,
        categoryId: req.body.params.category,
        addressId: req.body.params.addressId,
        userId: req.body.params.userId
    }

    try{
        db.executeStoredProcedure(sp.CREATE_UPDATE_BUSINESS, newBusiness, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('INSERT NEW BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE BUSINESS');
    try{
        db.executeStoredProcedure(sp.CREATE_UPDATE_BUSINESS, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('UPDATE BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/category', (req, res) => {
    logger.info('GET BUSINESSES BY CATEGORY');
    try{
        db.executeStoredProcedure(sp.GET_BUSINESS_CATEGORY, {categoryid:req.body.params}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('GET BUSINESSES BY CATEGORY ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/operationalStatus', (req, res) => {
    logger.info('GET ALL OPERATIONAL STATUSES');
    try{
        db.executeStoredProcedure(sp.GET_OPERATIONAL_STATUS, {operationalStatusId:null}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('GET ALL OPERATIONAL STATUSES ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/operationalStatus', (req, res) => {
    logger.info('GET OPERATIONAL STATUS');
    try{
        db.executeStoredProcedure(sp.GET_OPERATIONAL_STATUS, {operationalStatusId:req.body.params}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('GET OPERATIONAL STATUS ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;