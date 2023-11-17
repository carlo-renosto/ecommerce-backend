
import { chatManagerDao } from "../dao/index.js";

export class chatService {
    constructor() {
        this.dao = chatManagerDao;
    }

    async getMessages() {
        const messages = await this.dao.getMessages();
        return messages;
    }

    async addMessage(messageInfo) {
        const message = await this.dao.addMessage(messageInfo);
        return message;
    }
}