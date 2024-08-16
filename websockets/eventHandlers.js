const handleConnection = (ws, wss) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
};

module.exports = { handleConnection };
