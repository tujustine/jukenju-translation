/*
la fonction permet de récupérer les valeurs du champs du formulaire une fois que l'utilisateur
a appuyé sur le bouton envoyé et de faire apparaitre un message
 */
$(document).ready(function () {
    $("#contactform").submit(function () {
        var $prenom = $("#prenom").val();
        $("#content_to_hide").hide()
        $("#rep").append("\<" +
            "p>Merci pour votre message "+$prenom+" !<br/>\
            Nous mettons tout en oeuvre pour vous répondre le plus rapidement possible." )
    });
});