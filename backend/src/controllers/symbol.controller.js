const { symbolService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const redisClient = require("../config/redis");
const logger = require('../config/logger');

const addSymbol = catchAsync(async (req, res) => {
  const symbol = await symbolService.createSymbol(req.body);
  res.status(201).send(symbol);
});

const getSymbol = catchAsync(async (req, res) => {
  const { symbol } = req.query;
  const cacheKey = `symbols:${symbol || ''}:${req.query.page || 1}:${req.query.limit || 10}`;
 const cachedSymbols = await redisClient.get(cacheKey);
 if (cachedSymbols) {
   return res.send(JSON.parse(cachedSymbols));  // Return the cached data
 }

 const filter = {};
  if (symbol) {
    filter.symbol = { $regex: symbol, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const symbols = await symbolService.querySymbols(filter, options);
  await redisClient.setex(cacheKey, 300, JSON.stringify(symbols));

  res.send(symbols);
});

const getSymbolInfo = catchAsync(async (req, res) => {
  const { symbolId } = req.params;

  const cachedSymbol = await redisClient.get(`symbolInfo:${symbolId}`);
  logger.info(cachedSymbol);

  if (cachedSymbol) {
    return res.send(JSON.parse(cachedSymbol));  // Return the cached data
  }
  const symbol = await symbolService.getSymbolById(symbolId);
  if (!symbol) {
    return res.status(404).send({ message: 'Symbol not found' });
  }
  await redisClient.setex(`symbolInfo:${symbolId}`, 300, JSON.stringify(symbol));

  res.send(symbol);
});

const removeSymbol = catchAsync(async (req, res) => {
  const symbol = await symbolService.deleteSymbolById(req.params.symbolId);
  if (!symbol) {
    return res.status(404).send({ message: 'Symbol not found' });
  }
  res.status(204).send();
});

const getHistories = catchAsync(async (req, res) => {
  const filter = { symbol: req.params.symbolId, ...pick(req.query, ['period']) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await symbolService.getHistories(filter, options);
  res.send(result);
});

const updateSymbolHistory = catchAsync(async (req, res) => {
  await symbolService.updateSymbolHistory(req.params.symbolId, req.body);
  res.status(200).send({ message: 'Symbol history updated successfully' });
});

const updateSymbolPrice = catchAsync(async (req, res) => {
  const { symbolId } = req.params;
  const { newPrice } = req.body;
  const symbol = await symbolService.updateSymbolPrice(symbolId, newPrice);
  res.status(200).send(symbol);
});

module.exports = {
  addSymbol,
  getHistories,
  getSymbolInfo,
  getSymbol,
  removeSymbol,
  updateSymbolHistory,
  updateSymbolPrice,
};
