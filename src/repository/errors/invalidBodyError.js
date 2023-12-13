
import { config } from "../../config/config.js";

export const invalidBodyError = (name, cause="") => {
    return {
        name: name,
        cause: cause != "" ? cause : "Se ha recibido un cuerpo inválido. El cuerpo tiene que ser JSON. Por ejemplo: { 'id': '651f20d37ddebb31530de063' } '",
        message: "JSON body inválido",
        errorCode: config.error.invalid_body
    }
}