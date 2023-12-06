
import { ticketsModel } from "../../models/tickets.models.js";

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
            console.log("Error (ticket.mongo.js): " + error.message);
            throw error;
        }
    }
}