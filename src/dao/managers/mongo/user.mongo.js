
import { usersModel } from "../../models/users.models.js";
import { logger } from "../../../config/configLogger.js";
import { customError } from "../../../repository/errors/customError.service.js";
import { invalidIdError } from "../../../repository/errors/invalidIdError.js";
import { duplicatedEmailError } from "../../../repository/errors/duplicatedEmailError.js";

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
            logger.error("Error (user.mongo.js): " + error.message);
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await this.model.find().lean();
            return users;
        }
        catch(error) {
            logger.error("Error (user.mongo.js): " + error.message);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await this.model.findById(id);
            if(user == null) customError.createError(invalidIdError("Get user error"));

            return user;
        }
        catch(error) {
            const errorLog = {
                name: error.message,
                code: error.code,
                cause: error.cause
            }

            logger.error("Error (user.mongo.js): " + JSON.stringify(errorLog, null, 1));
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({email: email});

            return user;
        }
        catch(error) {
            logger.error("Error (user.mongo.js): " + error.message);
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            const userUpdated = await this.model.findByIdAndUpdate(id, user);

            return userUpdated;
        } 
        catch(error) {
            logger.error("Error (user.mongo.js): " + error.message);
            throw error;
        }
    }
}