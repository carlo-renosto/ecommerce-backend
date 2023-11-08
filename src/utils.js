
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import { config } from './config/config.js';

import jwt from "jsonwebtoken";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createPasswordHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
};

export const comparePasswordHash = (password, user) => {
    return bcrypt.compareSync(password, user.password);
};

export const PRIVATE_KEY = config.jwt.private_key;

export const generateToken = (user) => {
    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, PRIVATE_KEY, {expiresIn: "24h"});
    
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