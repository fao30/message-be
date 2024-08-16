require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const routes = require("./routes/messageRoutes");
const WebSocket = require("ws");
const {
  setupWebSocketServer,
  getWebSocketServer,
} = require("./websockets/websocketServer");

const app = express();
app.use(cors());
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);
setupWebSocketServer(server); // Initialize WebSocket server

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});

module.exports = { getWebSocketServer }; // Export the getter function for use elsewhere
