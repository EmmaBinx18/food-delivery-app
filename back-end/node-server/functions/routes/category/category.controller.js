const express = require('express');
const router = express.Router();

const db = require('../../database/db');
const sp = require('../../database/stored-procedures');

const logger = require('../../logger/winstin.logger');

router.get('/', (req, res) => {
    logger.info('GET ALL CATEGORIES');
    try {
        db.executeStoredProcedure(sp.category.GET_CATEGORY, { categoryId: null }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET ALL CATEGORIES ERROR', error);
        return res.status(500).send(error);
    }
});

router.get('/:categoryId', (req, res) => {
    logger.info('GET CATEGORY BY ID');
    try {
        db.executeStoredProcedure(sp.category.GET_CATEGORY, { categoryId: req.params.categoryId }, (data) => {
            return res.status(200).send(data);
        });
    }
    catch (error) {
        logger.error('GET CATEGORY BY ID ERROR', error);
        return res.status(500).send(error);
    }
});

router.post('/', (req, res) => {
    logger.info('INSERT NEW CATEGORY');
    const newCategory = {
        categoryId: -1,
        name: req.body.params.name,
        description: req.body.params.description
    }

    try {
        db.executeStoredProcedure(sp.category.CREATE_UPDATE_CATEGORY, newCategory, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('INSERT NEW CATEGORY ERROR', error);
        return res.status(500).send(error);
    }
});

router.patch('/', (req, res) => {
    logger.info('UPDATE CATEGORY');

    try {
        db.executeStoredProcedure(sp.category.CREATE_UPDATE_CATEGORY, req.body.params, () => {
            return res.status(200).send();
        });
    }
    catch (error) {
        logger.error('UPDATE CATEGORY ERROR', error);
        return res.status(500).send(error);
    }
});

module.exports = router;