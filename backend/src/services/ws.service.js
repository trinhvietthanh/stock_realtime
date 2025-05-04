const { Symbol, History } = require('../models');

class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.subscriptions = new Map(); // Map to track subscriptions by symbolId
  }

  handleConnection(ws) {
    this.clients.add(ws);
    console.log('Client connected. Total:', this.clients.size);
  
    const symbolCode = ws.symbolCode;
  
    ws.on('message', async (message) => {
      console.log('Received:', message);
      const { type } = JSON.parse(message);
  
      if (type === 'subscribePrice' && symbolCode) {
        const symbol = await Symbol.findOne({ symbol: symbolCode});
        if (symbol) {
          ws.send(JSON.stringify({ type: 'currentPrice', price: symbol.price }));
          this.addSubscription(ws, symbolCode);
        }
      }
  
      this.broadcast(message, ws);
    });
  
    ws.on('close', () => {
      this.clients.delete(ws);
      this.removeSubscription(ws);
      console.log('Client disconnected. Total:', this.clients.size);
    });
  }
  
  addSubscription(ws, symbolCode) {
    if (!this.subscriptions.has(symbolCode)) {
      this.subscriptions.set(symbolCode, new Set());
    }
    this.subscriptions.get(symbolCode).add(ws);
  }
  
  removeSubscription(ws) {
    for (const [symbolCode, clients] of this.subscriptions.entries()) {
      if (clients.has(ws)) {
        clients.delete(ws);
        if (clients.size === 0) {
          this.subscriptions.delete(symbolCode);
        }
      }
    }
  }
  broadcastPriceUpdate(symbolCode, newPrice) {
    const clients = this.subscriptions.get(symbolCode);
    if (!clients) return;
  
    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ type: 'priceUpdate', symbol: symbolCode, price: newPrice }));
      }
    }
  }
  

  broadcast(message, sender) {
    for (const client of this.clients) {
      if (client !== sender && client.readyState === client.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    }
  }
}

module.exports = new WebSocketService();
