const websocketService = require('../services/ws.service');
const WebSocket = require('ws');

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    websocketService.handleConnection(ws);
  });

  console.log('WebSocket server initialized');
}
  

module.exports = initWebSocket;
