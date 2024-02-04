
import bcrypt from "bcrypt";

export const createPasswordHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const comparePasswordHash = (password, user) => {
    return bcrypt.compareSync(password, user.password);
};