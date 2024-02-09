
import { userManagerDao } from "../../dao/index.js";
import { cartManagerDao } from "../../dao/index.js";

import { usersDto } from "../../dao/dto/users.dto.js";

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
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await this.dao.getUsers();
            return users;
        }
        catch(error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await this.dao.getUserById(id);
            return user;
        }
        catch(error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            return user;
        }
        catch(error) {
            throw error;
        }
    }

    async getUserPopulate(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            let cart = await this.daoC.getCartByUid(user._id);
            if(!cart) cart = [];

            const userDto = new usersDto(user, cart);

            return userDto;
        }
        catch(error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            const userUpdated = await this.dao.updateUser(id, user);
            
            return userUpdated;
        }
        catch(error) {
            throw error;
        }
    }

    async updateUserRole(id) {
        try {
            const user = await this.dao.getUserById(id);

            if(user && user.documents.length == 3) {
                user.role = "premium";
                await this.dao.updateUser(id, user);
            }
            else {
                throw new Error();
            }
            
            return user;
        }
        catch(error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.dao.deleteUser(id);
            
            return user;
        }
        catch(error) {
            throw error;
        }
    }
}