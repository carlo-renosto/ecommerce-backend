
import { userManagerDao } from "../../dao/index.js";
import { cartManagerDao } from "../../dao/index.js";

import { usersDto } from "../../dao/dto/users.dto.js";

import { logger } from "../../config/configLogger.js";

export class userRepository {
    constructor() {
        this.dao = userManagerDao;
        this.daoC = cartManagerDao;
    }

    async createUser(userInfo) {
        try {   
            const user = await this.dao.createUser(userInfo);
            return user;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }

    async getUsers() {
        try {
            const users = await this.dao.getUsers();
            return users;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await this.dao.getUserById(id);
            return user;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            return user;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }

    async getUserPopulate(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            const cart = await this.daoC.getCartByUid(user._id);

            const userDto = new usersDto(user, cart);

            return userDto;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }

    async updateUser(id, user) {
        try {
            const userUpdated = await this.dao.updateUser(id, user);
            
            return userUpdated;
        }
        catch(error) {
            logger.error("Error (user.repository.js): " + error.message);
        }
    }
}