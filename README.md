# Marielhost_7_01-09-2022
Groupomania - Réseau social d'entreprise

Dans ce projet 7 d'OpenClassrooms je devais créer un réseau social d'entreprise pour la société Groupomania.

J'ai utilisé plusieurs techno pour réaliser ce développement fullstack :

	• BACKEND : JavaScript - NodeJS - Express
	• FRONTEND : JavaScript - React - CSS
	• BASE DE DONNEES : MongoDB

Pour lancer le projet, suivre les instructions suivantes :

	• Télécharger le code (Download ZIP)
Backend :

	• Dans le backend, créer un fichier .env à la racine avec les informations suivantes :
  
SECRET_DB="mongodb+srv://user_groupomania:gYtgf7Sg33qcOR1f@cluster0.pancqom.mongodb.net/groupomania-project"

TOKEN_SECRET="dskhfjeshfjg757689Yhjdhsjhfjisqh7678987076gjdgqsuddgzu76GYT64SDR6Utgsdjhd"

CLIENT_URL="http://localhost:3000"

Dans le terminal :

	• cd backend
	• npm install
	• npm start
  
Frontend :

	• Dans frontend/client, créer un fichier .env à la racine avec les informations suivantes (bien se positionner dans client) :
  
REACT_APP_API_URL= http://localhost:5000/

REACT_APP_ADMIN="6363cc6eb01fac35dd79d81c"

Dans un nouveau terminal :

	• cd frontend/client
	• npm install
	• npm start

Pour lancer le projet les fois suivantes, ouvrir 2 invites de commandes. Une pour se placer dans le backend et l'autre dans le frontend/client. Exécuter la commande npm start dans les 2 invites.
