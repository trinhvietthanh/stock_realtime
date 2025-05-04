const express = require('express');
const auth = require('../../middlewares/auth');
const symbolController = require('../../controllers/symbol.controller');

const router = express.Router();

router.route('/histories')
  .get(symbolController.getHistories);

router.route('/')
  .post(symbolController.addSymbol)
  .delete(symbolController.removeSymbol);

router.route('/:symbolId')
  .get(auth('getSymbol'), symbolController.getSymbolInfo);

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
 *   get:
 *     summary: Get histories of a symbol
 *     tags: [Symbols]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Period to filter histories
 *     responses:
 *       200:
 *         description: List of symbol histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /symbol:
 *   post:
 *     summary: Create a new symbol
 *     tags: [Symbols]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the symbol
 *                 example: Bitcoin
 *               symbol:
 *                 type: string
 *                 description: Unique symbol identifier
 *                 example: btc
 *               image:
 *                 type: string
 *                 description: URL of the symbol image
 *                 example: http://example.com/image.png
 *               price:
 *                 type: string
 *                 description: Current price of the symbol
 *                 example: "50000"
 *               vendorApi:
 *                 type: string
 *                 description: Vendor API source
 *                 example: CoinMarketCap
 *     responses:
 *       201:
 *         description: Symbol created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The symbol ID
 *                   example: 60d0fe4f5311236168a109ca
 *                 name:
 *                   type: string
 *                   description: Name of the symbol
 *                   example: Bitcoin
 *                 symbol:
 *                   type: string
 *                   description: Unique symbol identifier
 *                   example: btc
 *                 image:
 *                   type: string
 *                   description: URL of the symbol image
 *                   example: http://example.com/image.png
 *                 price:
 *                   type: string
 *                   description: Current price of the symbol
 *                   example: "50000"
 *                 vendorApi:
 *                   type: string
 *                   description: Vendor API source
 *                   example: CoinMarketCap
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /symbol/{symbolId}:
 *   get:
 *     summary: Get a symbol by ID
 *     tags: [Symbols]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Symbol ID
 *     responses:
 *       200:
 *         description: Symbol information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Symbol'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /symbol:
 *   delete:
 *     summary: Delete a symbol
 *     tags: [Symbols]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: symbolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Symbol ID to delete
 *     responses:
 *       204:
 *         description: Symbol deleted successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */