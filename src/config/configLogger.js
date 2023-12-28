
import __dirname from "../utils.js";
import path from "path";
import dotenv from "dotenv";

import winston from "winston";

dotenv.config();

const currentEnv = process.env.LOGGER_ENVIRONMENT || "development";

const levelsLogger = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
}

const devLogger = winston.createLogger({
    levels: levelsLogger,
    transports: [
        new winston.transports.Console({level: "debug"})
    ]
});

const prodLogger = winston.createLogger({
    levels: levelsLogger,
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({filename: path.join(__dirname, "../errors.log"), level: "error"})
    ]
});

let logger;
if(currentEnv == "development") {
    logger = devLogger;
} 
else {
    logger = prodLogger;
}

export { logger };