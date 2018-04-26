function main() {
    var socket = io.connect('http://localhost:3000');
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var d_button = document.getElementById('delete');

    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;
    function deleteMessage() {
        socket.emit("delete message");
    }
    d_button.onclick = deleteMessage;
    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }
    function deleteMessages() {
        chatDiv.innerHTML = "";
    }

    socket.on('display message', handleMessage);
    socket.on('delete messages', deleteMessages);
} // main closing bracket

window.onload = main;