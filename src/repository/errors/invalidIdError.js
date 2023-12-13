
import { config } from "../../config/config.js";

export const invalidIdError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un ID inválido. El ID no pertenece a ninguna búsqueda.",
        message: "ID inválido",
        errorCode: config.error.invalid_id
    }
}