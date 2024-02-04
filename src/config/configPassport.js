
import passport from "passport";
import jwt from "passport-jwt"
import localStrategy from "passport-local";
import GithubStrategy from "passport-github2";

import { config } from "./config.js";
import { userService, cartsService } from "../repository/index.js";
import { createPasswordHash, comparePasswordHash } from "../utils/hash.js";

const JWTStrategy = jwt.Strategy;
const JWTExtract = jwt.ExtractJwt;

export const initializePassport = () => {
    passport.use("jwt-auth", new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.private_key
    },
    async(JWTPayload, done) => {
        try {
            return done(null, JWTPayload); 
        } 
        catch(error) {
            return done(error);
        }
    }));

    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async(request, username, password, done) => {
            const {first_name, last_name, age} = request.body;
            try {
                const user = await userService.getUserByEmail(username);
                if(user) {
                    return done(null, false);
                }

                const userNew = {
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password: createPasswordHash(password),
                    avatar: request.file.filename
                };

                const userCreated = await userService.createUser(userNew);
                await cartsService.createCart(userCreated._id);
                return done(null, userCreated);
            } 
            catch(error) {
                return done(error);
            }
        }
    ));

    passport.use("signupGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.client_id,
            clientSecret: config.github.client_secret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callback_url}`
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const user = await userService.getUserByEmail(profile.username);
                if(user) {
                    return done(null, false);
                }

                const newUser = {
                    first_name: profile.username,
                    last_name: "",
                    email: profile.username,
                    password: createPasswordHash(profile.id)
                };

                const userCreated = await userService.createUser(newUser);
                await cartsService.createCart(userCreated._id);
                return done(null, userCreated);
            } 
            catch(error) {
                const errorLog = {
                    name: error.message,
                    code: error.code,
                    cause: error.cause
                }

                console.log(errorLog);
                
                logger.error("Error (cart.mongo.js): " + JSON.stringify(errorLog, null, 1));
                return done(error);
            }
        }
    ));

    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField: "email"
        },
        async(username, password, done) => {
            try {
                const user = await userService.getUserByEmail(username);
                if(!user) {
                    return done(null, false);
                }
                if(!comparePasswordHash(password, user)) {;
                    return done(null, false);
                }

                user.last_connection = Date.now();
                const userUpdated = await userService.updateUser(user._id, user);

                return done(null, userUpdated);
            } 
            catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("loginGithubStrategy", new GithubStrategy(
        {
            clientID: config.github.client_id,
            clientSecret: config.github.client_secret,
            callbackURL: `http://localhost:8080/api/sessions${config.github.callback_url}-login`
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const user = await userService.getUserByEmail(profile.username);
                if(!user) {
                    return done(null, false);
                }

                user.last_connection = Date.now();
                const userUpdated = await userService.updateUser(user._id, user);
                
                return done(null, userUpdated);
            } 
            catch(error) {
                return done(error);
            }
        }
    ));

    passport.use("currentStrategy", new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.private_key
    },
    async(JWTPayload, done) => {
        try {
            return done(null, JWTPayload); 
        } 
        catch(error) {
            return done(error);
        }
    }));
}

const cookieExtractor = (request) => {
    var token = null;

    if(request && request.cookies) {
        token = request.cookies["cookieToken"];
    }
    
    return token;
};