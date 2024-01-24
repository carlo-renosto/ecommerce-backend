
import { userService } from "../repository/index.js";

export class usersController {
    static getUserCurrent = async(request, response) => {
        try {
            const userCurrent = await userService.getUserPopulate(request.user.email);
            
            response.render("perfilcurrent", {user: userCurrent});
        }
        catch(error) {
            response.json({status: "error", message: "Usuario no obtenido (error)"});
        }
    }

    static updateUserRole = async(request, response) => {
        try {
            const uid = request.params.uid;

            const userUpdated = await userService.updateUserRole(uid);

            response.json({status: "success", data: userUpdated});
        }
        catch(error) {
            response.json({status: "error", message: "Usuario no actualizado (error)"});
        }
    }

    static updateUserDocuments = async(request, response) => {
        try {
            const uid = request.params.uid;
            const user = await userService.getUserById(uid);

            const identificacion = request.files['identificacion']?.[0] || null;
            const domicilio = request.files['domicilio']?.[0] || null;
            const estadoDeCuenta = request.files['estadoDeCuenta']?.[0] || null;
            const docs = [];

            if(identificacion) {
                docs.push({name: "identificacion", reference: identificacion.filename}); 
            }
            if(domicilio) {
                docs.push({name: "domicilio", reference: domicilio.filename});
            }
            if(estadoDeCuenta) {
                docs.push({name: "estadoDeCuenta", reference: estadoDeCuenta.filename});
            }

            user.documents = docs;

            if(docs.length < 3) {
                user.status = "incompleto";
            } 
            else {
                user.status = "completo";
            }

            await userService.updateUser(user._id, user);
            response.json({status: "success", message: "Documentos actualizados"});
        } 
        catch(error) {
            response.json({status: "error", message: "Documentos no actualizados (error)"});
        }
    }
}