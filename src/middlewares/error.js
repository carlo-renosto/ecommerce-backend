
import { logger } from "../config/logger.js";
import { customError } from "../repository/errors/customError.service.js";
import { invalidBodyError } from "../repository/errors/invalidBodyError.js";
import { invalidParamError } from "../repository/errors/invalidParamError.js";

export const invalidBodyErrorHandler = (request, response, next) => {
    try {
        const body = request.body;

        if(body != null && typeof body == 'object') {
            next();
        } 
        else {
            response.json({ status: "error", message: "Data JSON no recibida (error)" });
            customError.createError(invalidBodyError("Invalid body error"));
        }
    }
    catch(error) {
        const errorLog = {
            name: error.message,
            code: error.code,
            cause: error.cause
        }

        logger.error("Error (error.js): " + JSON.stringify(errorLog, null, 1));
        return -1;
    }
};

export const invalidParamErrorHandler = (request, response, next) => {
    try {
        const cid = request.body.cid || request.params.cid;
        const pid = request.body.pid || request.params.pid;
        const uid = request.body.uid;

        if(cid == null && pid == null && uid == null) {
            response.json({status: "error", message: "Parámetro nulo (error)"});
            customError.createError(invalidParamError("Null param error", "No se ha ingresado ningún parámetro"));
        }
        if(cid != null && Number.isNaN(parseInt(cid))) {
            response.json({status: "error", message: "Carrito no obtenido (error)"});
            customError.createError(invalidParamError("Get cart error"));
        }
        else if(pid != null && Number.isNaN(parseInt(pid))) {
            response.json({status: "error", message: "Producto no obtenido (error)"});
            customError.createError(invalidParamError("Get product error"));
        }
        else if(uid != null && Number.isNaN(parseInt(uid))) {
            response.json({status: "error", message: "Usuario no obtenido (error)"});
            customError.createError(invalidParamError("Get user error"));
        }
    
        next();
    }
    catch(error) {
        const errorLog = {
            name: error.message,
            code: error.code,
            cause: error.cause
        }

        logger.error("Error (error.js): " + JSON.stringify(errorLog, null, 1));
        return -1;
    }
};