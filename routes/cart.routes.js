/**
 * Este archivo define las rutas HTTP correspondientes a la gestión de carritos.
 * Mapea los endpoints para consultar, actualizar, vaciar carritos individuales 
 * y obtener el histórico global de carritos (US12).
 */

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller.js');

// US12: Ruta GET para obtener el histórico global de carritos de todos los usuarios
router.get('/carts/global', cartController.getAllCarts);

// Rutas existentes para carritos individuales
router.get('/cart/:username', cartController.getCartByUsername);
router.post('/cart', cartController.saveOrUpdateCart);
router.put('/cart/item', cartController.updateItemQuantity);
router.delete('/cart/:username', cartController.clearCart);

module.exports = router;