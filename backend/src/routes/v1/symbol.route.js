const express = require('express');
const auth = require('../../middlewares/auth');
const symbolController = require('../../controllers/symbol.controller');

const router = express.Router();
 
router.route('/histories').get(auth('getSymbol'), symbolController.getHistories)
router.route('/symbol').post(auth('createSymbol'), symbolController.addSymbol)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Symbols
 *   description: Symbol management and retrieval
 */

/**
 * @swagger
 * /histories:
 *  post:
 *    summary: Get histories of symbol
 *    tags: [Symbols]
 */