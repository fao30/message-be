const { getWebSocketServer } = require("../websockets/websocketServer");
const { getAllMessages, createMessage } = require("../services/messageService");

const createMessageController = async (req, res) => {
  const { content } = req.body;
  const message = await createMessage(content);

  const wss = getWebSocketServer();
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ id: message.id, content: message.content }));
  });

  res.status(201).json(message);
};

const getMessagesController = async (req, res) => {
  const allMessages = await getAllMessages();
  res.json(allMessages);
};

module.exports = { createMessageController, getMessagesController };
