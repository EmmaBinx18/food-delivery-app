const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL USERS');
    try {
        return db.executeStoredProcedure(sp.user.GET_USER, { userId: null }, (data) => {
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
        return db.executeStoredProcedure(sp.user.GET_USER, { userId: req.params.uid }, (data) => {
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
        return db.executeStoredProcedure(sp.user.CREATE_UPDATE_USER, req.body.params, () => {
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
        return db.executeStoredProcedure(sp.user.CREATE_UPDATE_USER, req.body.params, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('UPDATE USER ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/:uid/deactivate', (req, res) => {
    logger.info('DEACTIVATE USER');
    try {
        return db.executeStoredProcedure(sp.user.DEACTIVATE_USER, { id: req.params.uid }, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('DEACTIVATE ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;