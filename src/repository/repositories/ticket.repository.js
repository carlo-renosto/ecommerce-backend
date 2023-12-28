
import { ticketManagerDao } from "../../dao/index.js";
import { logger } from "../../config/configLogger.js";

export class ticketRepository {
    constructor() { 
        this.dao = ticketManagerDao;
    }

    async createTicket(price, purchaser) {
        try {
            const ticketCreated = await this.dao.createTicket(price, purchaser);

            return ticketCreated;
        }
        catch(error) {
            logger.error("Error (ticket.repository.js): " + error.message);
        }
    }
}