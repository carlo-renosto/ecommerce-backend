
import { userService } from "../repository/index.js";
import { sendAccDeleteEmail } from "../config/configGmail.js";

export class usersController {
    static getUsersMenuView = (request, response) => {
        try {
            response.status(200).render("users");
        }
        catch(error) {
            response.status(500).render("home");
        }
    }

    static getUsersListView = async(request, response) => {
        try {
            const users = await userService.getUsersDto();

            if(users) {
                response.status(200).render("usersView", {users: users});
            }
            else {
                response.status(500).render("usersView", {error: "Usuarios no obtenidos (error)"});
            }
        }
        catch(error) {
            response.status(500).render("users");
        }
    }

    static updateUsersView = async(request, response) => {
        try {
            const uid = request.body.uid;
            const user = await userService.getUserById(uid);

            user.role = user.role === "user" ? "premium" : "user";
            await userService.updateUser(user._id, user);

            const users = await userService.getUsersDto();
            response.status(200).render("usersView", {users: users});
        }
        catch(error) {
            response.status(500).render("users");
        }
    }

    static deleteUsersOneView = async(request, response) => {
        try {
            const uid = request.body.uid;
            await userService.deleteUser(uid);

            const users = await userService.getUsersDto();
            const usersNew = users.filter(user => user._id !== uid);

            response.status(200).render("usersView", {users: usersNew});
        }
        catch(error) {
            response.status(500).render("users");
        }
    }

    static deleteUsersManyView = async(request, response) => {
        try {
            const users = await userService.getUsers();

            if(users) {
                let usersDeleted = [];
                users.forEach(async user => {
                    let dateCurrent = new Date(Date.now());
                    let dateMilliseconds = dateCurrent - user.last_connection;
                    let dateMinutes = (dateMilliseconds / 1000) / 60;
                    let dateHours = dateMinutes / 60;
                    let dateDays = dateHours / 24;

                    if(dateDays >= 2 && user.role != "admin") {
                        usersDeleted.push(user);
                        await userService.deleteUser(user._id);
                        await sendAccDeleteEmail(request, user.email);
                    } 
                });

                if(usersDeleted.length > 0) {
                    response.render("usersDelete", {users: usersDeleted});
                }
                else {
                    response.render("usersDelete", {message: "Usuarios no eliminados. Ningun usuario inactivo."});  
                }
            }
            else {
                response.status(500).render("users", {error: "Usuarios no obtenidos (error)"});
            }
        }
        catch(error) {
            console.log(error);
            response.status(500).render("users");
        }
    }

    static getUserCurrentView = async(request, response) => {
        try {
            const userCurrent = await userService.getUserPopulateByEmail(request.user.email);
            
            response.status(200).render("profile", {user: userCurrent});
        }
        catch(error) {
            response.status(500).json({status: "error", message: "Usuario no obtenido (error)"});
        }
    }

    static searchUserView = (request, response) => {
        try {
            response.render("usersSearch");
        }
        catch(error) {
            response.render("users");
        }
    }

    static searchUserViewSubmit = async(request, response) => {
        try {
            let uid = request.query.uid;
    
            const user = await userService.getUserPopulateById(uid);
    
            if(user) {
                response.render("usersSearch", {user: user});
            }
            else {
                response.render("usersSearch", {error: "Usuario no encontrado"});
            }            
        }
        catch(error) {
            response.render("usersSearch", {error: "Usuario no encontrado"});
        }
    }

    static getUsers = async(request, response) => {
        try {
            const users = await userService.getUsersDto();

            response.status(200).json({status: "success", users: users});
        }
        catch(error) {
            response.status(500).json({status: "error", message: "Usuarios no obtenidos (error)"});
        }
    }

    static updateUserRole = async(request, response) => {
        try {
            const uid = request.params.uid;

            const userUpdated = await userService.updateUserRole(uid);

            response.status(200).json({status: "success", data: userUpdated});
        }
        catch(error) {
            response.status(500).json({status: "error", message: "Usuario no actualizado (error)"});
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
            response.status(200).json({status: "success", message: "Documentos actualizados"});
        } 
        catch(error) {
            response.status(500).json({status: "error", message: "Documentos no actualizados (error)"});
        }
    }

    static deleteUsersMany = async(request, response) => {
        const users = await userService.getUsers();

        if(users) {
            let usersDeleted = [];
            users.forEach(async user => {
                let dateCurrent = new Date(Date.now());
                let dateMilliseconds = dateCurrent - user.last_connection;
                let dateMinutes = (dateMilliseconds / 1000) / 60;
                let dateHours = dateMinutes / 60;
                let dateDays = dateHours / 24;

                if(dateDays >= 2 && user.role != "admin") {
                    usersDeleted.push(user);
                    await userService.deleteUser(user._id);
                    await sendAccDeleteEmail(request, user.email);
                } 
            });

            if(usersDeleted.length > 0) {
                response.status(200).json({status: "success", users: usersDeleted});
            }
            else {
                response.status(404).json({status: "error", message: "Usuarios no eliminados (ningun usuario inactivo)"});  
            }
        }
        else {
            response.status(500).json({status: "error", message: "Usuarios no eliminados (error)"});
        }
    }
}