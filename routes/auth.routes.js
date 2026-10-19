/**
 * aqui definimos las rutas HTTP relacionadas con la autenticación de los 
 * usuarios en el servidor. Su propósito es actuar como el "enrutador" 
 * interceptando las peticiones que llegan desde el cliente, identificando 
 * el endpoint solicitado y derivando la petición al método correspondiente 
 * dentro del controlador de autenticación.
 */

// Importamos el framework Express para poder manejar servidores y rutas HTTP
const express = require('express');

// Creamos una instancia del enrutador de Express modularizar las rutas de autenticación
const router = express.Router();

// Importamos el controlador de autenticación que contiene la lógica de negocio 
const authController = require('../controllers/auth.controller');

/**
 * Express intercepta la solicitud y la ejecuta directamente llamando a 
 * la función 'authController.login'.
 */
router.post('/login', authController.login);

// Exportamos el enrutador para que pueda ser montado y utilizado en el archivo principal del servidor
module.exports = router;