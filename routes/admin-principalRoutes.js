const express = require('express');
const { getAllAdminPrincipal } = require('../models/admin-principalModel');
const adminPrincipalRouter = express.Router();

// Endpoint pour récupérer tous les utilisateurs
adminPrincipalRouter.get('/', getAllAdminPrincipal);

module.exports = adminPrincipalRouter;
 