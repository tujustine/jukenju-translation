/*
permet à l'utilisateur de copier le résultat de sa traduction grâce au bouton "copier"
se trouvant sous le résultat
 */
function copie() {
    // Sélectionner le texte à copier
    var copyText = $("#result");

    // Copier le texte dans le presse-papiers
    var temp = $("<input>");
    $("body").append(temp);
    temp.val(copyText.text()).select();
    document.execCommand("copy");
    temp.remove();

    // Afficher un message de confirmation
    alert("Le texte a été copié dans le presse-papiers.");
}
/*
permet à l'utilisateur d'enregistrer le résultat de sa traduction directement dans un fichier
txt nommé 'result.txt'
 */
function download() {
    // Sélectionner le texte à télécharger
    var downloadText = $("#result").text();

    // Créer un objet Blob contenant le texte
    var blob = new Blob([downloadText], { type: "text/plain;charset=utf-8" });

    // Créer un objet URL pour le Blob
    var url = URL.createObjectURL(blob);

    // Créer un lien de téléchargement et le déclencher
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "result.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}