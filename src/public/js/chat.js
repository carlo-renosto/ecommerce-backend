
const client_socket = io();

const template = Handlebars.compile(`
    <ul id="ul-messages">
        {{#each object.users}}
            <li>({{this.name}}): {{this.message}}</li>
        {{/each}}
    </ul>
    {{#if object.role}}
        <form method="post" action="/api/chats/message-add">
            <input id="message-submit" type="text" name="message">
            <input id="button" type="submit" value="Enviar">
        </form>
    {{else}}
        <input class="hidden" id="message-submit" type="text" name="message">
        <input class="hidden" id="submit" type="button" value="Enviar">
    {{/if}}
`);

client_socket.on("messages", (object) => {
    const renderedHTML = template(object);
    document.getElementById("centered-div").innerHTML = renderedHTML;
});

client_socket.on("message-add", (messageInfo) => {
    const ul = document.getElementById('ul-messages');
    const li = document.createElement('li');

    li.textContent = `(${messageInfo.user}): ${messageInfo.message}`;
    ul.appendChild(li);
})