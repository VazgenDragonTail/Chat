function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var del = document.getElementById("delete");
 
    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;
    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
}

socket.on('display message', handleMessage);
socket.on('delete-message', function(identifier) {
    connection.query("DELETE FROM `messages` WHERE `message_identifier` = '"+ identifier +"'", (err) => {
        if(!err) io.emit('message', { type: 'delete-message', identifier: identifier })
    });
})
} // main closing bracket

window.onload = main;