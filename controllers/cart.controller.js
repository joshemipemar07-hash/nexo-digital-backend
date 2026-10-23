const Cart = require('../models/cart.model.js');

class CartController {

    // Obtener el carrito de un usuario en la nube
    async getCartByUsername(req, res) {
        try {
            const { username } = req.params;
            let cart = await Cart.findOne({ username });
            if (!cart) {
                cart = { username, items: [] };
            }
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el carrito en la nube' });
        }
    }

    // Agregar o actualizar un producto (Control de duplicados sumando cantidades)
    async saveOrUpdateCart(req, res) {
        try {
            const { username, productId, title, price, quantity, imageUrl } = req.body;

            if (!username || !productId) {
                return res.status(400).json({ error: 'Faltan datos obligatorios (username, productId)' });
            }

            let cart = await Cart.findOne({ username });

            if (!cart) {
                if (quantity > 0) {
                    cart = new Cart({
                        username,
                        items: [{ productId, title, price, quantity, imageUrl }]
                    });
                } else {
                    return res.json({ username, items: [] });
                }
            } else {
                const itemIndex = cart.items.findIndex(item => item.productId === productId);

                if (itemIndex > -1) {
                    // El producto ya existe: incrementa la cantidad
                    const newQuantity = cart.items[itemIndex].quantity + (quantity || 1);
                    if (newQuantity <= 0) {
                        cart.items.splice(itemIndex, 1); // Si llega a 0, se elimina
                    } else {
                        cart.items[itemIndex].quantity = newQuantity;
                        if (title) cart.items[itemIndex].title = title;
                        if (price) cart.items[itemIndex].price = price;
                        if (imageUrl) cart.items[itemIndex].imageUrl = imageUrl;
                    }
                } else {
                    if (quantity > 0) {
                        cart.items.push({ productId, title, price, quantity, imageUrl });
                    }
                }
            }

            await cart.save();
            res.json(cart);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el carrito', details: error.message });
        }
    }

    // Actualizar cantidad directamente o eliminar
    async updateItemQuantity(req, res) {
        try {
            const { username, productId, quantity } = req.body;
            let cart = await Cart.findOne({ username });

            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            const itemIndex = cart.items.findIndex(item => item.productId === productId);
            if (itemIndex > -1) {
                if (quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                } else {
                    cart.items[itemIndex].quantity = quantity;
                }
                await cart.save();
            }

            res.json(cart);
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar la cantidad' });
        }
    }

    // Vaciar el carrito tras el pago exitoso
    async clearCart(req, res) {
        try {
            const { username } = req.params;
            let cart = await Cart.findOne({ username });
            if (cart) {
                cart.items = [];
                await cart.save();
            }
            res.json({ message: 'Carrito vaciado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al vaciar el carrito' });
        }
    }
}

module.exports = new CartController();