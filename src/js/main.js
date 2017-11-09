'use strict'

/* Fonctions de call back */

// Fonction pour ajouter une nouvelle message sur le paneu
var appendMsg = (msg) => {
    $("#message-panel").append($("<li>").text(msg));
};

// Fonction pour lister tous les utilisateurs connectées
var listUsers = (list) => {
    $("#user-list").text("Usuários na sala");
    list.forEach((elem) => {
        $("#user-list").append($("<li>").text(elem.nick));
    });
};

/* Script d'éxecituon quand le page démarre */
$(document).ready(() => {
    var socket = io();

    socket.emit("set nick", "User " + new Date().getMilliseconds());

    socket.on("chat message", appendMsg);

    socket.on("users connected", listUsers);

    /* Fonctions d'actions de les evenements de bouton, clics et autres */

    // Bouton pour envoyer des messages
    $("#send-message").on("click", () =>{
        appendMsg("EU: " + $("#message-text").val());
        socket.emit("chat message", $("#message-text").val());
    });

    // Bouton pour actualiser le surnom
    $("#btn-setnick").on("click", () =>{
        var nick = $("#nickname").val();
        $("#nickname-hidden").val(nick);
        socket.emit("set nick", nick);
    });
});

/* Script d'éxecution quand quiter le page */
$(window).unload(() => {
    socket.emit("disconnect");
});