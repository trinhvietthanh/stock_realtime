const symbolService = require('./symbol.service');

class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.subscriptions = new Map(); // Map to track subscriptions by symbolId
  }

  handleConnection(ws, req) {
    this.clients.add(ws);
    console.log('Client connected. Total:', this.clients.size);
    
   
    const symbolId = ws.symbolId;

    ws.on('message', async (message) => {
      console.log('Received:', message);
      const { type } = JSON.parse(message);
      console.log(symbolId);
      if (type === 'subscribePrice' && symbolId) {
        const symbol = await symbolService.getSymbolById(symbolId);
        if (symbol) {
          ws.send(JSON.stringify({ type: 'currentPrice', price: symbol.price }));
          this.addSubscription(ws, symbolId);
        }
      } else if (type === 'subscribeHistory' && symbolId) {
        const histories = await symbolService.getHistories(symbolId);
        ws.send(JSON.stringify({ type: 'symbolHistories', histories }));
      }

      this.broadcast(message, ws);
    });

    ws.on('close', () => {
      this.clients.delete(ws);
      this.removeSubscription(ws);
      console.log('Client disconnected. Total:', this.clients.size);
    });
  }

  addSubscription(ws, symbolId) {
    if (!this.subscriptions.has(symbolId)) {
      this.subscriptions.set(symbolId, new Set());
    }
    this.subscriptions.get(symbolId).add(ws);
  }

  removeSubscription(ws) {
    for (const [symbolId, clients] of this.subscriptions.entries()) {
      if (clients.has(ws)) {
        clients.delete(ws);
        if (clients.size === 0) {
          this.subscriptions.delete(symbolId);
        }
      }
    }
  }

  broadcastPriceUpdate(symbolId, newPrice) {
    if (this.subscriptions.has(symbolId)) {
      const clients = this.subscriptions.get(symbolId);
      for (const client of clients) {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: 'priceUpdate', symbolId, price: newPrice }));
        }
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
