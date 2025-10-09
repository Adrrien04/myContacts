# 📇 myContacts

**myContacts** est une application web de gestion de contacts simple et efficace, développée en **React (Vite + TypeScript)** pour le front-end et **Node.js / Express / MongoDB** pour le back-end.  
Elle permet aux utilisateurs de créer un compte, de se connecter, puis de gérer leur carnet d’adresses en ligne.



## 🚀 Fonctionnalités principales

-  Authentification (inscription / connexion)
-  Création, édition et suppression de contacts
-  Liste complète des contacts avec recherche
-  API documentée avec **Swagger**
- ️Données stockées dans **MongoDB**
-  Front-end avec **React + TypeScript + Vite**


---
## 💡 Accès en ligne du site

### Accès au front
L'accès au dahsboard, à la connexion ainsi qu'a l'inscription se feront ici :
**https://my-contacts-kohl.vercel.app**

### Accès au back
L'accès au backend se fera ici:
**https://mycontacts-uexx.onrender.com/**

L'accès au swagger se fera ici:
**https://mycontacts-uexx.onrender.com/api-docs/#/default**

---
## 🛑 Attention (Accès au swagger)

Si vous testez le swagger, à l'emplacement ou vous devez entrer le token vous devez mettre "Bearer " pour que l'authentification fonctionne correctement.
<a href="https://ibb.co/d4sybt08"><img src="https://i.ibb.co/pj6pWQvY/Sans-titre.png" alt="Sans-titre" border="0"></a>

---

## 🏗️ Structure du projet

```
myContacts/
│
├── backend/                 # Serveur Express + API REST
│   ├── controller/          # Logique métier (auth, contacts, etc.)
│   ├── model/               # Modèles Mongoose (User, Contact)
│   ├── route/               # Routes Express
│   ├── middleware.js        # Middleware (auth, erreurs)
│   ├── swagger.js           # Configuration Swagger
│   ├── server.js            # Point d’entrée du serveur
│   └── package.json
│
└── frontend/                # Application React + Vite
    ├── src/
    │   ├── Components/      # Composants réutilisables
    │   ├── Pages/           # Pages (Login, Register, Dashboard)
    │   ├── api/             # Fonctions d’appel API
    │   ├── App.tsx          # Routeur principal
    │   └── main.tsx         # Point d’entrée Vite
    ├── public/
    ├── index.html
    └── package.json
```

---

## ⚙️ Installation et exécution

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/myContacts.git
cd myContacts
```

### 2️⃣ Lancer le **backend**

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier `backend` :

```env
MONGO_URI=mongodb+srv://<utilisateur>:<motdepasse>@<cluster>.mongodb.net/
JWT_SECRET=ton_secret_jwt
PORT=5000
```

Puis exécuter le serveur :

```bash
node server.js
```

Le backend sera disponible sur :  
👉 **http://localhost:5000**

### 3️⃣ Lancer le **frontend**

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

L’application sera disponible sur :  
👉 **http://localhost:5173**

---

## 📘 Documentation API

Le projet inclut **Swagger** pour visualiser et tester les routes de l’API.

Une fois le backend démarré, accédez à :  
👉 **http://localhost:5000/api-docs**

---

## 🔑 Endpoints principaux

| Méthode | Route | Description |
|----------|--------|-------------|
| `POST` | `/auth/register` | Créer un nouveau compte |
| `POST` | `/auth/login` | Se connecter |
| `GET` | `/contacts` | Lister tous les contacts |
| `POST` | `/contacts` | Ajouter un contact |
| `PUT` | `/contacts/:id` | Modifier un contact |
| `DELETE` | `/contacts/:id` | Supprimer un contact |



##  Auteur

Développé par **Adrrien**

Dans le cadre d'un projet à l'Efrei
