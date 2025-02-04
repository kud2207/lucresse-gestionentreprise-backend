// models/user.js

const { db } = require("../config/db");

// Exemple de modèle pour récupérer tous les utilisateurs
const getAllAdminPrincipal = (req , res) => {
    db.query('SELECT * FROM admin_principal', (err, results) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
    })}
module.exports = {
    getAllAdminPrincipal,
};

