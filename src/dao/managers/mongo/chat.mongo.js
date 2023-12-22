
import { chatModel } from "../../models/chat.model.js";
import { logger } from "../../../config/logger.js";

export class chatManagerMongo {
    constructor() {
        this.model = chatModel;
    }

    async getMessages() {
        try {
            const messages = await this.model.find().lean();
            return messages;
        }
        catch(error) {
            logger.error("Error (chat.mongo.js): " + error.message);
        }
    }

    async addMessage(messageInfo) {
        try {
            const message = await this.model.create(messageInfo);
            return message;
        }
        catch(error) {
            logger.error("Error (chat.mongo.js): " + error.message);
        }
    }
}