
import { userManagerDao } from "../../dao/index.js";
import { cartManagerDao } from "../../dao/index.js";

import { usersDto } from "../../dao/dto/users.dto.js";

export class usersRepository {
    constructor() {
        this.dao = userManagerDao;
    }

    async getUserCurrent(email) {
        try {
            const user = await userManagerDao.getUserByEmail(email);
            const cart = await cartManagerDao.getCartByUid(user._id);

            const userDto = new usersDto(user, cart);

            return userDto;
        }
        catch(error) {
            throw error;
        }
    }
}