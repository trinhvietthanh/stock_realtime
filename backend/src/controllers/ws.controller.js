const websocketService = require('../services/ws.service');
const WebSocket = require('ws');

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const symbolId = urlParams.get('symbolId');
    if (symbolId) {
      ws.symbolId = symbolId;
    }
    websocketService.handleConnection(ws);
  });

  console.log('WebSocket server initialized');
}
  

module.exports = initWebSocket;
