/*
ajout de l'attribut class à l'élément body en lui assignant la valeur de mode qui gère si le site est en mode
light ou dark.
la fonction localStorage.getItem permet de sauvegarder l'état du site même si l'utilisateur quitte la page
-> si vous quittez la page en mode clair, et que vous ne supprimez pas vos caches entre temps,
lorsque vous reviendrez sur la page, elle s'affichera de nouveau en mode clair, même si le mode
par défaut est le mode dark
 */
$(document).ready(function (){
    document.getElementById("body").setAttribute("class", localStorage.getItem("mode"));
});

/*
permet de switcher entre le mode light et le mode dark du site à l'aide du bouton en bas à droite de
l'écran sur le site
 */
function switchTheme() {
    // Sélectionne le body de la page
    const body = document.querySelector('body');

    // Vérifie si le mode clair est activé
    const screenMode = body.getAttribute("class");
    const icon = document.querySelector('#theme-icon');

    // Si le mode clair est activé, active le mode sombre, sinon active le mode clair
    if (screenMode === "dark-screen") {
        body.classList.remove('dark-screen');
        body.classList.add('light-screen');
        icon.src = '/static/css/img/matin.png';
        icon.alt = 'mode clair';
        localStorage.setItem('mode', 'light-screen');
    } else {
        body.classList.remove('light-screen');
        body.classList.add('dark-screen');
        icon.src = '/static/css/img/nuit.png';
        icon.alt = 'mode sombre';
        localStorage.setItem('mode', 'dark-screen');
    }
}