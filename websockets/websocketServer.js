const WebSocket = require("ws");
const { handleConnection } = require("./eventHandlers");

let wss;
const setupWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    handleConnection(ws, wss);
  });

  return wss;
};

const getWebSocketServer = () => wss;

module.exports = { setupWebSocketServer, getWebSocketServer };
