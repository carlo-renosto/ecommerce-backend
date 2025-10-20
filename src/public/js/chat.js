
const client_socket = io();

client_socket.on("connect", () => {
    console.log("Client socket abierto (ID " + client_socket.id + ")");
    client_socket.emit("request_messages");
});

const template = Handlebars.compile(`
    <div class="chat-messages"> 
        <ul class="chat-messages-ul">
        {{#each users}}
            <li>({{this.name}}): {{this.message}}</li>
        {{/each}}
        </ul>
        {{#if users.empty}}
            <p>No hay mensajes en este canal.</p>
        {{/if}}
    </div>
    <div class="chat-form">
        <form method="post" action="/api/chats/message-add">
            <input class="message-submit" type="text" name="message"> 
            <input class="message-submit-button" type="submit" value="Enviar">
        </form>
    </div>
`);

client_socket.on("messages", (data) => {
    const dataNew = {
        users: data.users.map(user => ({
            name: user.name,
            message: user.message
        })),
        empty: data.users.length === 0
    };
    const renderedHTML = template(dataNew);
    document.getElementsByClassName("chat-div")[0].innerHTML = renderedHTML;
});

client_socket.on("message-add", (data) => {
    const ul = document.getElementsByClassName('chat-messages-ul')[0];
    const li = document.createElement('li');

    li.textContent = `(${data.user}): ${data.message}`;
    ul.appendChild(li);
})