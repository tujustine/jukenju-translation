# lancer dans le dossier ouù se trouve le fichier
# uvicorn main:app --reload
# lancer : http://127.0.0.1:8000
import json
import os
import uvicorn
import pickle
from typing import Optional
from uuid import uuid4
from fastapi import FastAPI, UploadFile, Request, Form, HTTPException
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from deep_translator import GoogleTranslator
from fastapi.encoders import jsonable_encoder

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

MSG_DATABASE_FILE = "./static/json/sent_messages.json"

if os.path.exists(MSG_DATABASE_FILE):
     with open(MSG_DATABASE_FILE) as f:
         MSG_DATABASE = json.load(f)


class Message(BaseModel):
    id : Optional[str] = uuid4().int
    nom : str
    prenom : str
    mail : str
    message : str


@app.get("/") # get pour demander une tache
async def root(request: Request):
    """
    Fonction qui mène à la page d'accueil
    """
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/identification")
async def identification(request: Request):
    """
    Fonction qui mène à la page d'identification
    de la langue
    """
    return templates.TemplateResponse("identification.html", {"request": request})

@app.get("/traduction")
async def traduction(request: Request):
    """
    Fonction qui mène à la page de traduction
    """
    return templates.TemplateResponse("traduction.html", {"request": request})

@app.get("/contact")
async def contact(request: Request):
    """
    Fonction qui mène à la page contact
    """
    return templates.TemplateResponse("contact.html", {"request": request})

@app.post("/afficher_la_langue")
async def afficher_la_langue(request: Request, phrase: Optional[str] = Form(None)):
    """
    Fonction qui renvoie la langue
    d'une phrase donnée. Si le champ est vide
    on renvoie la page identification.html
    :param request:
    :param phrase:
    """
    if not phrase:
        return templates.TemplateResponse("identification.html", {"request": request, "submit": False})
    else:
        model = pickle.load(open("./modeles/model_lr-cv", "rb"))
        langue = model.predict([phrase.lower()])[0]
        submit = True
        return templates.TemplateResponse("identification.html", {"request": request, "langue": langue, "submit": submit})

@app.post("/afficher_la_langue_file")
async def afficher_la_langue_file(request: Request, file: Optional[UploadFile]):
    """
    Fonction qui renvoie la langue
    d'un fichier txt donné.
    :param request:
    :param file:
    """
    if not file or not file.filename:
        return templates.TemplateResponse("identification.html", {"request": request, "submit": False})
    else:
        contents = await file.read()
        phrase = contents.decode("utf-8")
        model = pickle.load(open("./modeles/model_lr-cv", "rb"))
        langue = model.predict([phrase.lower()])[0]
        submit = True
        return templates.TemplateResponse("identification.html", {"request": request, "langue": langue, "submit": submit})

@app.post("/afficher_la_traduction")
async def afficher_la_traduction(request: Request, phrase: Optional[str] = Form(None), source: str = Form(...), cible: str = Form(...)):
    """
    Fonction qui renvoie la traduction
    d'une phrase donnée.
    :param request:
    :param phrase:
    :param source:
    :param cible:
    :return:
    """
    if not phrase:
        return templates.TemplateResponse("traduction.html", {"request": request, "submit": False})
    else:
        traduction = GoogleTranslator(source=source, target=cible).translate(phrase)
        submit = True
        return templates.TemplateResponse("traduction.html", {"request": request, "traduction": traduction, "submit": submit})


@app.post("/afficher_la_traduction_file")
async def afficher_la_traduction_file(request: Request, file: Optional[UploadFile], source: str = Form(...), cible: str = Form()):
    """
    Fonction qui renvoie la traduction
    d'un fichier txt donné.
    :param request:
    :param file:
    :param source:
    :param cible:
    """
    if not file or not file.filename:
        return templates.TemplateResponse("traduction.html", {"request": request, "submit": False})
    else:
        contents = await file.read()
        phrase = contents.decode("utf-8")
        traduction = GoogleTranslator(source=source, target=cible).translate(phrase)
        submit = True
        return templates.TemplateResponse("traduction.html", {"request": request, "traduction": traduction, "submit": submit})

@app.post("/recup_message", response_class=HTMLResponse)
async def recup_message(request: Request):
    """
    Fonction qui écrit les informations données
    dans un fichier json. On ne retourne rien.
    :param request:
    :raise: HTTPException
    """
    form_data = await request.form()
    nom = form_data.get("nom")
    prenom = form_data.get("prenom")
    mail = form_data.get("mail")
    message = form_data.get("message")

    envoi = Message(nom=nom, prenom=prenom,mail=mail,message=message)
    envoi.id = uuid4().hex
    json_recette = jsonable_encoder(envoi)

    MSG_DATABASE.append(json_recette)
    with open(MSG_DATABASE_FILE, 'w') as file:
         json.dump(MSG_DATABASE, file)
    raise HTTPException(status_code=204)



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")
