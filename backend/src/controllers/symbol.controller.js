const { symbolService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const addSymbol = catchAsync(async (req, res) => {
  const symbol = await symbolService.createSymbol();
});

const getSymbolInfo = catchAsync(async(req, res) => {
  const symbol = await symbolService.getSymbolById()
});

const removeSymbol = catchAsync(async (req, res) => {
  await symbolService.deleteSymbolById();
});

const getHistories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['period']);
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
