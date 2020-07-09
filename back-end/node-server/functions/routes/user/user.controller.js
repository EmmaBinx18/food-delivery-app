const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL USERS');
    try {
        db.executeStoredProcedure(sp.GET_USER, { userId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL USERS ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:uid', (req, res) => {
    logger.info('GET USER BY UID');
    try {
        db.executeStoredProcedure(sp.GET_USER, { userId: req.params.uid }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET USER BY UID ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW USER');
    try {
        db.executeStoredProcedure(sp.CREATE_UPDATE_USER, req.body.params, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('INSERT NEW USER ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE USER');
    try {
        db.executeStoredProcedure(sp.CREATE_UPDATE_USER, req.body.params, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('UPDATE USER ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:uid/deactivate', (req, res) => {
    logger.info('DEACTIVATE USER');
    try {
        // console.log({ userId: req.params.uid })
        db.executeStoredProcedure(sp.DEACTIVATE_USER, { userId: req.params.uid }, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('DEACTIVATE ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:uid/reactivate', (req, res) => {
    logger.info('REACTIVATE USER');
    try {
        // console.log({ userId: req.params.uid })
        db.executeStoredProcedure(sp.DEACTIVATE_USER, { userId: req.params.uid , activate : true}, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('REACTIVATE ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;