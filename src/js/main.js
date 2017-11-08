var appendMsg = (msg) => {
    $("#message-panel").append($("<li>").text(msg));
};

$(document).ready(() => {
    var socket = io();

    $("#command-line .btn").on("click", () =>{
        appendMsg($("#message-text").val());
        socket.emit("chat message", $("#message-text").val());
    });

    socket.on("chat message", appendMsg);
});