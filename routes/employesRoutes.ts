const express = require('express');
const { getAllEmployes } = require('../models/employesModel');
const employesRoutes = express.Router();

// Endpoint pour récupérer tous les utilisateurs
employesRoutes.get('/', getAllEmployes);

module.exports = employesRoutes;


