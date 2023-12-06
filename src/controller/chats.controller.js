
import { chatService } from "../repository/index.js";
import { socket_server } from "../app.js"

export class chatsController {
    static getMessages = async(request, response) => {
        try {
            const messages = await chatService.getMessages();
            const role = request.user.role == "user" ? request.user.role : null;

            const users = messages.map(user => ({name: user.user, message: user.message}));

            response.render("chat");
            setTimeout(() => socket_server.sendMessages({object: {users: users, role: role}}, response), 100)            
        }
        catch(error) {
            response.json({status: "error", message: error.message});
        }
    };

    static addMessage = async(request, response) => {
        try {
            const message = request.body.message;

            const messageInfo = {
                user: request.user.name,
                message: message,
            };

            await chatService.addMessage(messageInfo);

            response.sendStatus(204);
            socket_server.socket.emit("message-add", messageInfo);
        }
        catch(error) {
            response.json({status: "error", message: "Mensaje no añadido (error)"});
        }
    }
}