const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');



router.post('/approveallbusinesses', (req, res) => {
    logger.info('APPROVE ALL BUSINESSES');
    
    try {
        db.executeStoredProcedure(sp.APPROVE_BUSINESS, { businessId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('APPROVE ALL BUSINESSES ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/disapprovebusiness/', (req, res) => {
    logger.info('DISAPPROVE BUSINESS');
    try {
        db.executeStoredProcedure(sp.APPROVE_BUSINESS, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('DISAPPROVE BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/approvebusiness/', (req, res) => {
    logger.info('APPROVE BUSINESS');
    try {
        db.executeStoredProcedure(sp.APPROVE_BUSINESS, { businessId: req.body.params.businessId, activate : true }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('APPROVE BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});


router.post('/removeuserrole/', (req, res) => {
    logger.info('REMOVE USER FROM ROLE');
    try {
        db.executeStoredProcedure(sp.REMOVE_USER_FROM_ROLE, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('REMOVE USER FORM ROLE ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/userroles', (req, res) => {
    logger.info('GET ALL USER ROLES');
    
    try {
        db.executeStoredProcedure(sp.GET_USER_ROLES, { roleId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL USER ROLES ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/customers', (req, res) => {
    logger.info('GET ALL USERS NOT IN ROLE (CUSTOMERS)');
    
    try {
        db.executeStoredProcedure(sp.GET_USER_ROLE, { roleId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL USERS NOT IN ROLE ERROR', error);
        return res.status(500).send(error);
    }
});


router.post('/addbusinessrole', (req, res) => {
    logger.info('ADD USER TO BUSINESS ROLE');
    try {
        db.executeStoredProcedure(sp.ADD_TO_BUSINESS_ROLE, req.body.params, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('ADD USER TO BUSINESS ROLE ERROR', error);
        return res.status(500).send(error);
    }
});


router.post('/closebusiness', (req, res) => {
    logger.info('CLOSE BUSINESS');
    try {
        db.executeStoredProcedure(sp.CLOSE_BUSINESS, req.body.params, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('CLOSE BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/openbusiness', (req, res) => {
    logger.info('OPEN BUSINESS');
    try {
        console.log( { businessId: req.body.params.businessId , activate : 1})
        db.executeStoredProcedure(sp.CLOSE_BUSINESS, { businessId: req.body.params.businessId , activate : 1}, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('OPEN BUSINESS ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;