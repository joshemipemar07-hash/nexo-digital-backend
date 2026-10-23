const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller.js');

router.get('/cart/:username', cartController.getCartByUsername);
router.post('/cart', cartController.saveOrUpdateCart);
router.put('/cart/item', cartController.updateItemQuantity);
router.delete('/cart/:username', cartController.clearCart);

module.exports = router;