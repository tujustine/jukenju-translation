# jukenju-translation

## Description
Projet de fin de semestre réalisé dans le cadre du cours de M2 IM Techniques Web du master pluriTAL à l'INALCO. Ce projet consiste en la création d'un site internet exploitant différentes techniques du web (FastAPI, HTML, CSS, JS, Jquery, Ajax) pour la traduction automatique et la détection de langues. Les modèles permettant la détection de la langue ont été entraîné en local sur machine ultérieurement dans un cours du M1 pluriTAL. Pour la traduction automatique, c'est le package python deep-translators qui a été utilisé.

## Installation des packages nécessaires
```
pip install -r requirements.txt
```

## Lancement du site
Le site se lance à partir du fichier python main.py avec la commande : 

```
uvicorn main:app --reload
```

Il faut ensuite ouvrir le lien : http://127.0.0.1:8000

## Auteures
Ce projet a été réalisé par Kenza Piter, Julie Bauné et Justine Tu