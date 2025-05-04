const { Symbol, History } = require('../models');
const wsService = require('./ws.service');
const querySymbols = async (filter, options) => {
  const symbols = await Symbol.paginate(filter, options);
  return symbols;
};

const getHistories = async (symbolId) => {
  return History.find({ symbol: symbolId });
}

const createSymbol = async (symbolBody) => {
  const existing = await Symbol.findOne({ symbol: symbolBody.symbol });
  if (existing) {
    throw new Error('Symbol with this code already exists');
  }
  return Symbol.create(symbolBody);
};

const getSymbolById = async (symbolId) => {
  return Symbol.findById(symbolId);
};

const getSymbolByCode = async (symbol) => {
  const data = await Symbol.findOne({ symbol: symbol})
  return data;
}

const updateSymbolHistory = async (symbolId, historyBody) => {
  const symbol = await getSymbolById(symbolId);
  if (!symbol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Symbol not found');
  }
  const history = await getHistories(symbolId);
  if (history.length > 0) {
    Object.assign(history, historyBody);
    await history.save();
  } else {
    await History.create({"symbol": symbolId ,...historyBody});
  }
}

const updateSymbolPrice = async (symbolId, newPrice) => {
  const symbol = await getSymbolById(symbolId);
  if (!symbol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Symbol not found');
  }
  symbol.price = newPrice;
  await symbol.save();
  wsService.broadcastPriceUpdate(symbol.symbol.toLowerCase(), newPrice);


  return symbol;
}

const deleteSymbolById = async (symbolId) => {
  const symbol = await getSymbolById(symbolId);
  if (!symbol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Symbol not found');
  }
  await symbol.remove();
  return symbol;
};

const deleteSymbolHistory = async (symbolId) => {
  const symbol = await getSymbolById(symbolId);
  if (!symbol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Symbol not found');
  }
  const history = await getHistories(symbolId);
  if (history) {
    await history.remove();
  }
  return symbol;
}

module.exports = {
  createSymbol,
  deleteSymbolById,
  deleteSymbolHistory,
  updateSymbolHistory,
  updateSymbolPrice,
  querySymbols,
  getSymbolById,
  getSymbolByCode,
}
