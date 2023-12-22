
import { config } from "../../config/config.js";

export const invalidCodeError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un código inválido. El código no pertenece a ninguna búsqueda.",
        message: "Código inválido",
        errorCode: config.error.invalid_code
    }
}