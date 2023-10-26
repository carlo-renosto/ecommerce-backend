
import passport from "passport";
import localStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import { config } from "./config.js";
import { usersModel } from "../dao/mongo/models/users.models.js";
import { createPasswordHash, comparePasswordHash } from "../utils.js";

export const initializePassport = () => {
    // Nombre de la estrategia
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async(request, username, password, done) => {
            const {first_name} = request.body;
            try {
                const user = await usersModel.findOne({email: username});

                if(user) {
                    return done(null, false);
                }

                const userNew = {
                    first_name,
                    email: username,
                    password: createPasswordHash(password)
                };

                const userCreated = await usersModel.create(userNew);
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
                const user = await usersModel.findOne({email: profile.username});
                if(user) {
                    return done(null, user);
                }

                const newUser = {
                    first_name: profile._json.name,
                    email: profile.username,
                    password: createPasswordHash(profile.id)
                };

                const userCreated = await usersModel.create(newUser);
                return done(null, userCreated);
            } 
            catch(error) {
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
                const user = await usersModel.findOne({email: username});

                if(!user) {
                    return done(null, false);
                }
                if(!comparePasswordHash(password, user)) {;
                    return done(null, false);
                }
                return done(null, user);
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
                const user = await usersModel.findOne({email: profile.username});
                
                if(!user) {
                    return done(null, false);
                }
                
                return done(null, user);
            } 
            catch(error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    });
}