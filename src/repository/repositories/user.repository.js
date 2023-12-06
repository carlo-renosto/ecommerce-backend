
import { userManagerDao } from "../../dao/index.js";
import { cartManagerDao } from "../../dao/index.js";

import { usersDto } from "../../dao/dto/users.dto.js";

export class usersRepository {
    constructor() {
        this.dao = userManagerDao;
        this.daoC = cartManagerDao;
    }

    async getUserPopulate(email) {
        try {
            const user = await this.dao.getUserByEmail(email);
            const cart = await this.daoC.getCartByUid(user._id);

            const userDto = new usersDto(user, cart);

            return userDto;
        }
        catch(error) {
            console.log("Error (user.repository.js): " + error.message);
        }
    }
}