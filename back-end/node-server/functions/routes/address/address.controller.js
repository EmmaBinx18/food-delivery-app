const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.post('/', (req, res) => {
    logger.info('INSERT NEW ADDRESS');
    const newAddress = {
        addressId: -1,
        street: req.body.params.street,
        suburb: req.body.params.suburb,
        complex: req.body.params.complex,
        zipcode: req.body.params.zipcode,
        city: req.body.params.city,
        province: req.body.params.province,
        country: req.body.params.country
    }

    try{
        db.executeStoredProcedure(sp.CREATE_UPDATE_ADDRESS, newAddress, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('INSERT NEW ADDRESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE ADDRESS');
    try{
        db.executeStoredProcedure(sp.CREATE_UPDATE_USER, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch(error){
        logger.error('UPDATE ADDRESS ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;