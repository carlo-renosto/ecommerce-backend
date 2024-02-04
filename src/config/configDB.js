
import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Base de datos conectada exitosamente");
    }
    catch(error) {
        console.log(error);
    }
}