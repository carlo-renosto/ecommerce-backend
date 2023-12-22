
import { config } from "../../config/config.js";

export const duplicatedIdError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un ID ya existente. El ID actualmente pertenece a un carrito.",
        message: "ID duplicado",
        errorCode: config.error.duplicated_id
    }
}