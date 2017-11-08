var appendMsg = (msg) => {
    $("#message-panel").append($("<li>").text(msg));
};

$("#command-line .btn").on("click", () =>{
    appendMsg($("#message-text").val());
    socket.emit("chat message", $("#message-text").val());
});

$(document).ready(() => {
    var socket = io();
    socket.emit("set nick", "User " + new Date().getMilliseconds());
    socket.on("chat message", appendMsg);
    socket.on("users connected", (list) => {
        $("#user-list").text("");
        list.forEach((elem) => {
            $("#user-list").append($("<li>").text(elem.nick));
        });
    })
});