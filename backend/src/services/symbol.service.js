const { Symbol, History } = require('../models');

const querySymbols = async (filter, options) => {
  const symbols = await Symbol.paginate(filter, options);
  return symbols;
};

const getHistories = async (symbolId) => {
  return History.find({ symbol: symbolId });
}

const createSymbol = async (symbolBody) => {
  const existing = await Symbol.findOne({ code: symbolBody.code });
  if (existing) {
    throw new Error('Symbol with this code already exists');
  }
  return Symbol.create(symbolBody);
};

const updateSysmbolHistory = async (symbolId, historyBody) => {
  const symbol = await getSymbolById(symbolId);
  if (!symbol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Symbol not found');
  }
  const history = await getHistories(symbolId);
  if (history) {
    Object.assign(history, historyBody);
    await history.save();
  } else {
    await History.create(historyBody);
  }
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
  updateSysmbolHistory,
  querySymbols,
}

