
import { chatService } from "../repository/index.js";
import { socket_server } from "../app.js"

export class chatsController {
    static getMessages = async(request, response) => {
        try {
            const messages = await chatService.getMessages();
            const role = (request.user.role == "user" || request.user.role == "premium") ? request.user.role : null;

            response.render("chat");
        }
        catch(error) {
            response.json({status: "error", message: "Mensajes no obtenidos (error)"});
        }
    }

    static addMessage = async(request, response) => {
        try {
            const message = request.body.message;

            const messageInfo = {
                user: request.user.name,
                message: message,
            };

            await chatService.addMessage(messageInfo);

            socket_server.addMessage(messageInfo);
            response.sendStatus(204);
        }
        catch(error) {
            response.json({status: "error", message: "Mensaje no añadido (error)"});
        }
    }
}