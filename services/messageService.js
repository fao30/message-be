const { Message } = require("../models");

const getAllMessages = async () => {
  return await Message.findAll({
    order: [["id", "ASC"]],
  });
};

const createMessage = async (content) => {
  const messages = await getAllMessages();
  if (messages.length >= 9) {
    const firstElement = messages[0].id;
    await Message.destroy({ where: { id: firstElement } });
  }
  return await Message.create({ content });
};

module.exports = {
  getAllMessages,
  createMessage,
};
