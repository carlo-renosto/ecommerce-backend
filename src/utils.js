
import { config } from './config/config.js';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import path from 'path';
import { fileURLToPath } from 'url';

import { faker } from "@faker-js/faker";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createPasswordHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const comparePasswordHash = (password, user) => {
    return bcrypt.compareSync(password, user.password);
};

export const PRIVATE_KEY = config.jwt.private_key;

export const generateToken = (user) => {
    const token = jwt.sign({id: user.id, name: user.first_name + " " + user.last_name, email: user.email, role: user.role}, PRIVATE_KEY, {expiresIn: "24h"});
    
    return token;
}

export const validateToken = (request, response, next)=>{
    const authHeader = request.headers["authorization"];
    if(!authHeader) return response.sendStatus(401);

    const token = authHeader.split(" ")[1];

    if(token === null) return response.sendStatus(401);

    jwt.verify(token,PRIVATE_KEY,(err, payload)=>{
        if(err) return response.sendStatus(403);
        request.user = payload;
        next();
    });
};

const { database, string, image, commerce } = faker;

export const mockProduct = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        description: commerce.productDescription(),
        code: string.alphanumeric(5),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(3)),
        category: commerce.productAdjective(),
        thumbnail: image.url()
    } 
};