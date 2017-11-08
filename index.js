'use stric'

var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    routes = require('./routes'),
    io = require("socket.io")(http);
    
app.set('view engine', 'pug');
app.use("/public", express.static("public"));
routes(app);

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
    });
});

http.listen(3000, () => {
    let D = new Date();
    console.log("Server started at " + D.getMilliseconds());
})