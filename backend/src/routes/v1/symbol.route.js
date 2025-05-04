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
  .get(symbolController.getSymbolInfo)
  .patch(symbolController.updateSymbolHistory);

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

/**
 * @swagger
 * /symbol/{symbolId}:
 *   patch:
 *     summary: Update a symbol's history
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               open:
 *                 type: string
 *                 description: Opening price
 *                 example: "48000"
 *               close:
 *                 type: string
 *                 description: Closing price
 *                 example: "49000"
 *               high:
 *                 type: string
 *                 description: Highest price
 *                 example: "49500"
 *               low:
 *                 type: string
 *                 description: Lowest price
 *                 example: "47000"
 *               period:
 *                 type: string
 *                 format: date-time
 *                 description: Period of the history
 *                 example: "2023-10-01T00:00:00Z"
 *     responses:
 *       200:
 *         description: Symbol history updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Symbol history updated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */