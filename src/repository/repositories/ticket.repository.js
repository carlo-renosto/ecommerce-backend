
import { ticketManagerDao } from "../../dao/index.js";

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
            console.log("Error (ticket.repository.js): " + error.message);
            throw error;
        }
    }
}