
import { eError } from "../enums/errors.enum.js";

export const errorHandler = (error, request, response, next) => {
    console.log(error.code);

    switch (error.code) {
        case eError.DATABASE_ERROR:
            response.json({status:"error", error: error.cause});
            break;

        case eError.INVALID_BODY_JSON:
            response.json({status:"error", error: error.message});
            break;

        case eError.INVALID_PARAM:
            response.json({status:"error", error: error.cause, message: error.message});
            break;

        default:
            break;
    }
};