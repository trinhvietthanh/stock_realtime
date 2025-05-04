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

const updateSymbolPriceByCode = async (code, newPrice) => {
  const symbol = await getSymbolByCode(code);
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


const fetchGoldPrice = async () => {
  try {
    const res = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': "goldapi-9z5cuvsma9spa7g-io",
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch price: ${res.status}`);
      return;
    }

    const data = await res.json();
    cachedGoldPrice = {
      price: data.price,
      metal: data.metal,
      currency: data.currency,
      timestamp: new Date().toISOString(),
    };
    lastUpdated = Date.now();
    await updateSymbolPriceByCode("xau/usd", cachedGoldPrice.price)
    console.log(`[${cachedGoldPrice.timestamp}] Updated XAU/USD: ${data.price}`);
  } catch (err) {
    console.error('Error fetching gold price:', err.message);
  }
};

// Poll every 15 seconds (or increase to avoid rate limit)
// setInterval(fetchGoldPrice, 15000);
// fetchGoldPrice()
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
