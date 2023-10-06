
import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://ecmrc:BL99hsn2ZtvV8I9b@ecommerce.rowzcke.mongodb.net/?retryWrites=true&w=majority");
        console.log("BD conectada");
    }
    catch(error) {
        console.log(error);
    }
}