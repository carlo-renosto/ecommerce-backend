
import { ticketsModel } from "../../models/tickets.models.js";

export class TicketManager {
    constructor() { 
        this.model = ticketsModel;
    }

    async createTicket(price, purchaser) {
        try {
            const ticketCreated = await this.model.create({number: price, purchaser: purchaser});

            return ticketCreated;
        }
        catch(error) {
            console.log("Error: " + error.message);
            throw error;
        }
    }
}