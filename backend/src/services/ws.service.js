const Redis = require('ioredis');
const { Symbol } = require('../models');
const config = require("../config/config")

class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.subscriptions = new Map();

    this.pub = new Redis({
      host: config.redis.host, 
      port: config.redis.port,
    });

    this.sub = new Redis({
      host: config.redis.host, 
      port: config.redis.port,
    }); 

    this.sub.psubscribe('price:*');
    this.sub.on('pmessage', (pattern, channel, message) => {
      const symbolCode = channel.split(':')[1];
      const newPrice = JSON.parse(message).price;
      this.broadcastPriceUpdate(symbolCode, newPrice);
    });
  }

  handleConnection(ws) {
    this.clients.add(ws);
    console.log('Client connected. Total:', this.clients.size);

    ws.on('message', async (message) => {
      const data = JSON.parse(message);
      const { type, symbolCode } = data;

      if (type === 'subscribePrice' && symbolCode) {
        const symbol = await Symbol.findOne({ symbol: symbolCode });
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
      clients.delete(ws);
      if (clients.size === 0) {
        this.subscriptions.delete(symbolCode);
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

  // Hàm dùng để publish từ nơi cập nhật giá
  async publishPrice(symbolCode, newPrice) {
    await this.pub.publish(`price:${symbolCode}`, JSON.stringify({ price: newPrice }));
  }
}

module.exports = new WebSocketService();
