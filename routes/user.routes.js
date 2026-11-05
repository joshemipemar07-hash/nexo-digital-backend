/**
 * Este archivo define las rutas HTTP correspondientes a la gestión de usuarios.
 * Su propósito es interceptar las solicitudes relacionadas con usuarios y 
 * derivarlas a los métodos correspondientes del 'userController'.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// Ruta GET para obtener el listado completo de usuarios registrados (US11)
router.get('/users', userController.getAllUsers);

module.exports = router;