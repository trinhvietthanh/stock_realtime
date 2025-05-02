const querySymbols = async (filter, options) => {
  const symbols = await Symbol.paginate(filter, options);
  return symbols;
};


const getSymbolById = async (id) => {
  return Symbol.findById(id);
}

const getHistories = async (id) => {
  return History.find({ symbol: id });
}

const createSymbol = async (symbolBody) => {
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

