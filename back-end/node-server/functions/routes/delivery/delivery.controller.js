const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.post('/register', (req, res) => {
    logger.info('CHANGE USER ROLE TO DELIVERY DRIVER');
    try{
        db.executeStoredProcedure(sp.ADD_TO_DRIVER_ROLE, {userId:req.body.params}, (data) => {
            return res.status(200).send(JSON.parse(data));
        });
    }
    catch(error){
        logger.error('CHANGE USER ROLE TO DELIVERY DRIVER ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;