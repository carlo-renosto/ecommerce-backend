
import { config } from "../../config/config.js";

export const duplicatedCodeError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un código ya existente. El código pertenece a un producto.",
        message: "Código duplicado",
        errorCode: config.error.duplicated_code
    }
}