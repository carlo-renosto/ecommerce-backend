
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String, 
        default: () => {
            return nanoid();
        }
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {type: Number},
    purchaser: {type: String}
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

export { ticketsModel as ticketsModel };