/*
cette fonction permet d'afficher la partie cachée des explications pour les modèles de traduction
et d'identification de la langue comme un menu déroulant en appuyant sur le bouton et de la cacher
en rappuyant dessus si elle est déjà déroulée
 */

function unroll() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].classList.toggle("active");
        var content = coll[i].nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }
}