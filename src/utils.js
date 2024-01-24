
import { config } from './config/config.js';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import multer from 'multer';

import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

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

const checkValidFields = (user) => {
    const { first_name, email, password } = user;
    if(!first_name || !email || !password) {
        return false;
    } 
    else {
        return true;
    }
}

const profileMulterFilter = (request, file, cb) => {
    if(!checkValidFields(request.body)) {
        cb(null, false);
    } 
    else {
        cb(null, true);
    }
}

const profileStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/img"));
    },

    filename: function(request, file, cb) {
        cb(null, `${request.body.email}-perfil-${file.originalname}`);
    }
})

const uploadProfile = multer({storage: profileStorage, fileFilter: profileMulterFilter});

const documentsStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/multer/users/documents"));
    },

    filename: function(request, file, cb) {
        cb(null, `document-${file.originalname}`);
    }
})

const uploadDocuments = multer({storage: documentsStorage});

const imgProductsStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, path.join(__dirname, "/multer/products/img"));
    },

    filename: function(request, file, cb) {
        cb(null, `${request.body.code}-product-${file.originalname}`);
    }
})

const uploadImgProducts = multer({storage: imgProductsStorage});

export { uploadProfile, uploadDocuments, uploadImgProducts };