/**
 * aqui definemos el modelo de Mongoose para ell ushuario.
 * Su función principal es establecer una estructura estricta y 
 * validada de cómo se guardarán los datos de los usuarios en la base de datos de 
 * MongoDB Atlas, asegurando campos obligatorio y roles predeterminados
 */

// Importamos la librería mongoose y asi gestiona la conexión con MongoDB
const mongoose = require('mongoose');

// Definimos la estructura de datos que va a tener cada documento dentro de la colección de usuario
const userSchema = new mongoose.Schema({
    
    // Campo 'username': Define el nombre de usuario. 
    username: { type: String, required: true },
    
    // Campo 'password': Define la contraseña de acceso del usuario.
    password: { type: String, required: true },
    
    // Campo 'role': Define el nivel de privilegios del usuario en la aplicación (ej. 'admin' o 'user').
    role: { type: String, default: 'user' }

}, { 
    versionKey: false 
});

/**
 * Compilamos el esquema en un modelo de Mongoose y lo exportamos 
 *para usarlo en controladores y rutas.
  */
module.exports = mongoose.model('User', userSchema, 'users');