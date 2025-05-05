const { symbolService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const addSymbol = catchAsync(async (req, res) => {
  const symbol = await symbolService.createSymbol(req.body);
  res.status(201).send(symbol);
});

const getSymbol = catchAsync(async (req, res) => {
  const { symbol } = req.query;

  const filter = {};
  if (symbol) {
    filter.symbol = { $regex: symbol, $options: 'i' };
  }

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const symbols = await symbolService.querySymbols(filter, options);
  res.send(symbols);
});

const getSymbolInfo = catchAsync(async (req, res) => {
  const symbol = await symbolService.getSymbolById(req.params.symbolId);
  if (!symbol) {
    return res.status(404).send({ message: 'Symbol not found' });
  }
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
