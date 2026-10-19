/**
 * aqui es la lógica de autenticación de los usuarios.
 * Su propósito es recibir las credenciales enviadas desde nuestra app móvil, 
 * consultarla base de datos de MongoDB, mediante el modelo User, 
 * validar que existan y coincidan, y finalmente devolver 
 * una respuesta HTTP con un token de acceso o un mensaje de error según corresponda.
 */

// Importamos 
const User = require('../models/user.model');

exports.login = async (req, res) => {
    try {
        // Extraemos 'username' y 'password' del cuerpo (body) de la petición HTTP que manda la app móvil
        const { username, password } = req.body;
        
        // Buscamos en la base de datos el nombre de usuario proporcionado.
        const user = await User.findOne({ username });
        
        // Verificamos si el usuario NO existe en la base de datos
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Validación directa de la contraseña en texto plano comparándola con la guardada en el documento de Mongoose
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.status(200).json({
            message: '¡Bienvenido!',
            token: 'fake-jwt-token-12345', // Token simulado para mantener la compatibilidad con Retrofit en Kotlin
            username: user.username,        // Devolvemos el nombre de usuario autenticado
            role: user.role                 // Devolvemos eel rol
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};