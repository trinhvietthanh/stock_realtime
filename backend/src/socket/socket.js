const { getLivePrices } = require('../services/stock.service');

const symbolSubscribers = {}; // { symbol: Set(socketId) }

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('subscribe_symbol', (symbol) => {
      if (!symbolSubscribers[symbol]) {
        symbolSubscribers[symbol] = new Set();
      }
      symbolSubscribers[symbol].add(socket.id);
    });

    socket.on('unsubscribe_symbol', (symbol) => {
      if (symbolSubscribers[symbol]) {
        symbolSubscribers[symbol].delete(socket.id);
        if (symbolSubscribers[symbol].size === 0) {
          delete symbolSubscribers[symbol];
        }
      }
    });

    socket.on('disconnect', () => {
      Object.keys(symbolSubscribers).forEach((symbol) => {
        symbolSubscribers[symbol].delete(socket.id);

        if (symbolSubscribers[symbol].size === 0) {
          delete symbolSubscribers[symbol];
        }
      });
    });
  });

  // Gửi giá mỗi 1s
  setInterval(async () => {
    const symbols = Object.keys(symbolSubscribers);
    if (symbols.length === 0) return;

    const prices = await getLivePrices(symbols);

    symbols.forEach((symbol) => {
      const sockets = symbolSubscribers[symbol];
      if (!prices[symbol] || sockets.size === 0) return;

      sockets.forEach((socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          socket.emit('stock_update', { [symbol]: prices[symbol] });
        }
      });
    });
  }, 1000);
};

module.exports = setupSocket;
