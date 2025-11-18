import messageRepository from "../repositories/message.repository.js";

class MessageService {
  getMessages(query) {
    return messageRepository.findAll(query, {});
  }

  createMessage(payload) {
    return messageRepository.create(payload);
  }
}

export default new MessageService();
