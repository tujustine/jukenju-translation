/*
    code permettant de passer du mode sombre au mode clair et inversement et de sauvegarder 
    l'information dans le localStorage afin de s'en resservir. 
    Le mode par défaut est le mode sombre mais si on quitte la page en mode clair et 
    qu'on décide de revenir dessus (sans avoir vidé les caches) alors le mode qui s'affiche
    sera le mode clair.
 */

$(document).ready(function () {
    // Initialisation du mode et de l'icône en fonction du stockage local

    // Récupère le mode (clair ou sombre) depuis le localStorage, par défaut dark-screen
    let savedMode = localStorage.getItem('mode');
    if (savedMode === null) {
        savedMode = 'dark-screen';
    }

    // Récupère l'icône correspondant au mode depuis le localStorage, par défaut 'nuit.png'
    let savedIcon = localStorage.getItem('icon');
    if (savedIcon === null) {
        savedIcon = '/static/css/img/nuit.png';
    }

    // Ajout de l'attribut class au body qui a la valeur récupérée de la clé mode (sera donc light ou dark)
    document.getElementById('body').setAttribute('class', savedMode);
    // Récupère l'élément img de l'icône du thème
    const icon = document.getElementById('theme-icon');
    icon.src = savedIcon;

    // Définit l'attribut alt de l'icône en fonction du mode
    if (savedMode === 'dark-screen') {
        icon.alt = 'mode sombre';
    }
    else {
        icon.alt = 'mode clair';
    }

    // Fonction pour changer de thème
    function switchTheme() {
        const body = document.querySelector('body');

        // Détermine le mode actuel en vérifiant la classe du body
        let currentMode;
        if (body.classList.contains('dark-screen')) {
            currentMode = 'dark-screen';
        }
        else {
            currentMode = 'light-screen';
        }

        // Détermine le nouveau mode en basculant entre 'dark-screen' et 'light-screen'
        let newMode;
        if (currentMode === 'dark-screen') {
            newMode = 'light-screen';
        }
        else {
            newMode = 'dark-screen';
        }

        body.classList.remove(currentMode);
        body.classList.add(newMode);
        // Stocke le nouveau mode dans le localStorage
        localStorage.setItem('mode', newMode);
        updateThemeIcon(newMode);
    }

    // Fonction pour mettre à jour l'icône en fonction du mode
    function updateThemeIcon(mode) {
        // Récupère l'élément img de l'icône du thème
        const icon = document.getElementById('theme-icon');
        if (mode === 'dark-screen') {
            icon.src = '/static/css/img/nuit.png';
            icon.alt = 'mode sombre';
            localStorage.setItem('icon', '/static/css/img/nuit.png');
        } else {
            icon.src = '/static/css/img/matin.png';
            icon.alt = 'mode clair';
            localStorage.setItem('icon', '/static/css/img/matin.png');
        }
    }

    // Attache l'événement de clic au bouton ayant pour identifiant theme-switcher
    $('#theme-switcher').click(function () {
        switchTheme();
    });
});