
import { chatModel } from "../../models/chat.model.js";

export class ChatManagerMongo {
    constructor() {
        this.model = chatModel;
    }

    async getMessages() {
        try {
            const messages = await this.model.find().lean();
            return messages;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }

    async addMessage(messageInfo) {
        try {
            const message = await this.model.create(messageInfo);
            return message;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }
}