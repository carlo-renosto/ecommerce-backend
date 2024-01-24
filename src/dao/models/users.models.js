
import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    age: Number,
    password: String,
    status: { type: String, enum: ["pendiente", "incompleto", "completo"], default: "pendiente", required: true},
    role: { type: String, enum: ["user", "premium", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    documents: { type: [{name: String, reference: String}], default: [] },
    last_connection: { type: Date, default: null }
});

export const usersModel = mongoose.model(usersCollection, userSchema);