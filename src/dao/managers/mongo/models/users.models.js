
import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    age: Number,
    password: String,
    cart: Number,
    role: { type: String, default: "user" }
});

export const usersModel = mongoose.model(usersCollection, userSchema);