
import { config } from "../../config/config.js";

export const duplicatedEmailError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un email ya existente. El email pertenece a un usuario.",
        message: "Email duplicado",
        errorCode: config.error.duplicated_email
    }
}