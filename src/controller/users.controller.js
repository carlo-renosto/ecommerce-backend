
import { usersService } from "../repository/index.js";

export class usersController {
    static getUserCurrent = async(request, response) => {
        try {
            const userCurrent = await usersService.getUserPopulate(request.user.email);

            response.render("perfilcurrent", {user: userCurrent});
        }
        catch(error) {
            response.json({status: "error", message: "Mensaje no obtenido (error)"});
            console.log("Error (users.controller.js): " + error.message);
        }
    }
}