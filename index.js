'use stric'

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    routes = require('./routes'),
    io = require("socket.io")(http),
    users = new Array();
    
app.set('view engine', 'pug');
app.use("/public", express.static("public"));
routes(app);

io.on("connection", (socket) => {
    // Fonction de submission à les autres utilisateurs
    users.push({ id: socket.id, nick: socket.id});
    io.emit("chat message", "Usuário conectado");

    socket.on("chat message", (msg) => {
        // Envoyer des messages à les autres utilisateurs sauf le expéditeur
        socket.broadcast.emit("chat message", msg);
    });

    socket.on("set nick", (nickname) => {
        users.forEach((elem) =>{
            if(elem.id == socket.id)
                elem.nick = nickname;
        });
        io.emit("chat message", "Nick alterado para " + nickname);
        io.emit("users connected", users);
    });
});

http.listen(3000, () => {
    let D = new Date();
    console.log("Server started at " + D.toString());
});
