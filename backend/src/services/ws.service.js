class WebSocketService {
    constructor() {
      this.clients = new Set();
    }
  
    handleConnection(ws) {
      this.clients.add(ws);
      console.log('Client connected. Total:', this.clients.size);
  
      ws.on('message', (message) => {
        console.log('Received:', message);
        this.broadcast(message, ws);
      });
  
      ws.on('close', () => {
        this.clients.delete(ws);
        console.log('Client disconnected. Total:', this.clients.size);
      });
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
  
  