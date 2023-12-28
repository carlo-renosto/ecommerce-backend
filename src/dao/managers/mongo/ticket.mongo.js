
import { ticketsModel } from "../../models/tickets.models.js";
import { logger } from "../../../config/configLogger.js";

export class ticketManagerMongo {
    constructor() { 
        this.model = ticketsModel;
    }

    async createTicket(price, purchaser) {
        try {
            const ticketCreated = await this.model.create({amount: price, purchaser: purchaser});

            return ticketCreated;
        }
        catch(error) {
            logger.error("Error (ticket.mongo.js): " + error.message);
        }
    }
}