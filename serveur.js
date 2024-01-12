// Importe Express et initialise une application
import express from "express";
import connection from "./connectDB.js"; // Importe la connexion à la base de données depuis connectDB.js
import userRouter from "./routes/userRoutes.js"; // Importe le routeur pour la gestion des utilisateurs depuis userRoutes.js
import morgan from "morgan"; // Importe le middleware Morgan pour les logs de requêtes HTTP
import dotenv from "dotenv";
import User from "./modeles/modelUser.js";
import cors from "cors";
import createAdminUser from './controllers/adminController.js';


dotenv.config(); // Charge les variables d'environnement à partir du fichier .env

const app = express(); // Initialise une application Express

// Définit le port sur lequel le serveur va écouter les connexions entrantes
const port = process.env.PORT || 3000;

// Utilisation du middleware Morgan pour les logs de développement
app.use(morgan("dev"));

// Utilisation d'express.json() pour analyser les corps des requêtes au format JSON
app.use(express.json());

// Route pour la racine de l'API, renvoie simplement un message "Hello World!"
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Utilisation du routeur userRouter pour les chemins relatifs à la gestion des utilisateurs
app.use("/", userRouter);

app.use(cors());

// Ajout du compte administrateur
createAdminUser ();


// Fonction asynchrone pour démarrer le serveur
const startServer = async () => {
  try {
    // Vérifie la connexion à la base de données en utilisant la méthode authenticate()
    await connection.authenticate();

    // Synchronise le modèle User avec la base de données
    await User.sync({ force: true });

    // Appelle la fonction pour créer le compte administrateur une fois que la synchronisation est terminée
    //await createAdminUser();

    // Lance le serveur Express pour écouter les connexions entrantes sur le port spécifié
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    // En cas d'erreur lors du démarrage du serveur, affiche l'erreur et termine le processus avec le code 1
    console.error("Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
};

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});

// Appel de la fonction startServer pour démarrer le serveur
startServer();
