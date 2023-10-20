
import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    email: { type: String, unique: true},
    password: String,
    role: String
});

export const usersModel = mongoose.model(usersCollection, userSchema);