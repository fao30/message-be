const { Message } = require("../models");
const { getWebSocketServer } = require("../websockets/websocketServer");

const createMessage = async (req, res) => {
  const { content } = req.body;
  const messages = await Message.findAll({
    order: [["id", "ASC"]],
  });

  const wss = getWebSocketServer();
  // sads;
  if (messages.length >= 9) {
    const firstElement = messages[0].id;
    await Message.destroy({ where: { id: firstElement } });
  }
  const message = await Message.create({ content });
  await wss.clients.forEach((client) => {
    client.send(JSON.stringify({ id: message.id, content: message?.content }));
  });
  res.status(201).json(message);
};

const getMessages = async (req, res) => {
  const allMessages = await Message.findAll();
  res.json(allMessages);
};

module.exports = { createMessage, getMessages };
