const { symbolService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const addSymbol = catchAsync(async (req, res) => {
  console.log(req.body);
  const symbol = await symbolService.createSymbol(req.body);
  res.status(201).send(symbol);
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

module.exports = {
  addSymbol,
  getHistories,
  getSymbolInfo,
  removeSymbol,
};
