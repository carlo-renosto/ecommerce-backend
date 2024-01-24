
import { chatManagerDao } from "../../dao/index.js";

export class chatRepository {
    constructor() {
        this.dao = chatManagerDao;
    }

    async getMessages() {
        try {
            const messages = await this.dao.getMessages();
            return messages;
        }
        catch(error) {
            throw error;
        }
    }

    async addMessage(messageInfo) {
        try {
            const message = await this.dao.addMessage(messageInfo);
            return message;
        }
        catch(error) {
            throw error;
        }
    }
}