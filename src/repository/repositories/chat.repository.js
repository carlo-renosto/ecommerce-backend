
import { chatManagerDao } from "../../dao/index.js";
import { logger } from "../../config/configLogger.js";

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
            logger.error("Error (chat.repository.js): " + error.message);
        }
    }

    async addMessage(messageInfo) {
        try {
            const message = await this.dao.addMessage(messageInfo);
            return message;
        }
        catch(error) {
            logger.error("Error (chat.repository.js): " + error.message);
        }
    }
}