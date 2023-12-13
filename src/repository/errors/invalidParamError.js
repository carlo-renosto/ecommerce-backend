
import { config } from "../../config/config.js";

export const invalidParamError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un ID inválido. El ID tiene que ser alfanumérico. Ejemplo: 651f20d37ddebb31530de063",
        message: "ID inválido",
        errorCode: config.error.invalid_param
    }
}