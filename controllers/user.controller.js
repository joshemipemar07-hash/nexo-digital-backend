/**
 * Controlador para la gestión de usuarios en el backend de Node.js.
 * Su propósito es centralizar la lógica de negocio relacionada con los usuarios,
 * permitiendo cumplir con requerimientos como el listado completo para administradores (US11).
 */

const User = require('../models/user.model');

class UserController {
    /**
     * Obtiene todos los usuarios registrados en el sistema (US11).
     * Excluye el campo de la contraseña por seguridad y devuelve la lista en formato JSON.
     */
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}, '-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la lista de usuarios', details: error.message });
        }
    }
}

module.exports = new UserController();