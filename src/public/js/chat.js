
const client_socket = io();

client_socket.emit("request_messages");

const message = document.getElementById("message-submit");
const button = document.getElementById("button");

button.addEventListener("click", () => {
    client_socket.emit("message_add", message.value);
});

client_socket.on("messages", (messages) => {
    displayMessages(messages);
});

client_socket.on("messages-update", (message) => {
    addMessage(message);
});

function displayMessages(messages) {
    const container = document.getElementById('centered-div');
    const ul = document.getElementById('ul-messages');
    ul.innerHTML = "";

    messages.forEach(message => {
        const li = document.createElement('li');
        li.textContent = `(${message.user}): ${message.message}`;
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function addMessage(message) {
    const ul = document.getElementById('ul-messages');
    const li = document.createElement('li');

    li.textContent = `(${message.user}): ${message.message}`;

    ul.appendChild(li);
}
