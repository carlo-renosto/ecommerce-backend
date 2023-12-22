
import { userService } from "../repository/index.js";

export class usersController {
    static getUserCurrent = async(request, response) => {
        try {
            const userCurrent = await userService.getUserPopulate(request.user.email);
            if(!userCurrent) throw new Error();
            
            response.render("perfilcurrent", {user: userCurrent});
        }
        catch(error) {
            response.json({status: "error", message: "Mensaje no obtenido (error)"});
        }
    }
}