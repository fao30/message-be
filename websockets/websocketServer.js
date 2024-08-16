const WebSocket = require("ws");

let wss;
const setupWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log("Received:", message);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};

const getWebSocketServer = () => wss;

module.exports = { setupWebSocketServer, getWebSocketServer };
