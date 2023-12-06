
import { usersModel } from "../../models/users.models.js";

export class userManagerMongo {
    constructor() {
        this.model = usersModel;
    }

    async createUser(userInfo) {
        try {
            const user = await this.model.create(userInfo);
            return user;
        }
        catch(error) {
            console.log("Error (user.mongo.js): " + error.message);
        }
    }

    async getUsers() {
        try {
            const users = await this.model.find().lean();
            return users;
        }
        catch(error) {
            console.log("Error (user.mongo.js): " + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await this.model.findById(id);
            if(user == null) throw new Error("UID inexistente");

            return user;
        }
        catch(error) {
            console.log("Error (user.mongo.js): " + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({email: email});
            if(user == null) throw new Error("Email inexistente");

            return user;
        }
        catch(error) {
            console.log("Erro (user.mongo.js): " + error.message);
        }
    }
}