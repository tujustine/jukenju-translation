/* 
fonction qui affiche soit la partie texte soit la partie import de fichier 
et qui permet de colorer les boutons en fonction de l'onglet sur lequel on se trouve
*/

function affichage(bouton) {    
    if (bouton === "texte") {
        // d-none équivaut à display:none; donc l'affichage ou non d'un contenu
        document.querySelector('.text-input').classList.remove('d-none');
        document.querySelector('.file-input').classList.add('d-none');
        $("#btn-choice-txt").css("background-color", "rgba(255, 255, 255, 0.29)");
        $("#btn-choice-file").css("background-color", "#848181a5");
    } else if (bouton === "fichier") {
        document.querySelector('.file-input').classList.remove('d-none');
        document.querySelector('.hidden_container').classList.remove('d-none');
        document.querySelector('.text-input').classList.add('d-none');
        $("#btn-choice-txt").css("background-color", "#848181a5");
        $("#btn-choice-file").css("background-color", "rgba(255, 255, 255, 0.29)");
    }
}